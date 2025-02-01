export default class EventUtil {

    static updateDate(currentDateTime: Date, newDate: Date) {
        const updatedDateTime = new Date(currentDateTime);
        updatedDateTime.setFullYear(newDate.getFullYear());
        updatedDateTime.setMonth(newDate.getMonth());
        updatedDateTime.setDate(newDate.getDate());
        return updatedDateTime;
    };
      
    static updateTime(currentDateTime: Date, newTime: Date)  {
        const updatedDateTime = new Date(currentDateTime);
        updatedDateTime.setHours(newTime.getHours());
        updatedDateTime.setMinutes(newTime.getMinutes());
        updatedDateTime.setSeconds(newTime.getSeconds());
        console.log("Updated TimeStamp:", updatedDateTime);
        return updatedDateTime;
    };
}