import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { getTutorTimesheets } from '../../../backend/firestore';
import { useAuth } from '../../../context/AuthContext';
import { Timesheet } from '../../../types/Timesheet';

const useTimesheetList = () => {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { user } = useAuth();

  const getTimesheets = async () => {
    setLoading(true);
    try {
      const newTimesheets = await getTutorTimesheets(user.uid);
      setTimesheets(newTimesheets);
    } catch (error: any) {
      Alert.alert(
        'Failed to get Timesheets',
        `Failed to get Timesheets: ${error.message}\nPlease try refreshing the page.`
      );
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTimesheets();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getTimesheets();
    setRefreshing(false);
  };

  return { onRefresh, timesheets, loading, refreshing };
};

export default useTimesheetList;
