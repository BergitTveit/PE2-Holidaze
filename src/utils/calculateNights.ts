export const calculateNights = (dateFrom: string, dateTo: string): number => {
    return Math.ceil(
      (new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / (1000 * 60 * 60 * 24)
    );
  };