function createEmployeeRecord(employeeArray) {
    let employee = {};
    employee.firstName = employeeArray[0];
    employee.lastName = employeeArray[1];
    employee.title = employeeArray[2];
    employee.payPerHour = parseFloat(employeeArray[3]);
    employee.timeInEvents = [];
    employee.timeOutEvents = [];
    return employee;
  }
  
  function createEmployeeRecords(employeeArrays) {
    let employeeRecords = [];
    for (let i = 0; i < employeeArrays.length; i++) {
      employeeRecords.push(createEmployeeRecord(employeeArrays[i]));
    }
    return employeeRecords;
  }
  
  function createTimeInEvent(employeeRecord, dateTimeString) {
    if (!employeeRecord || !employeeRecord.timeInEvents) return null;
    let timeInEvent = {};
    timeInEvent.dateTime = new Date(dateTimeString);
    employeeRecord.timeInEvents.push(timeInEvent);
    return timeInEvent;
  }
  
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    if (!employeeRecord || !employeeRecord.timeOutEvents) return null;
    let timeOutEvent = {};
    timeOutEvent.dateTime = new Date(dateTimeString);
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return timeOutEvent;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    if (!employeeRecord || !employeeRecord.timeInEvents || !employeeRecord.timeOutEvents) return 0;
    let timeInEvents = employeeRecord.timeInEvents.filter(event => event.dateTime.toDateString() === date.toDateString());
    let timeOutEvents = employeeRecord.timeOutEvents.filter(event => event.dateTime.toDateString() === date.toDateString());
    let totalHours = 0;
    for (let i = 0; i < timeInEvents.length; i++) {
      if (!timeOutEvents[i]) continue;
      totalHours += (timeOutEvents[i].dateTime - timeInEvents[i].dateTime) / (1000 * 60 * 60);
    }
    return totalHours;
  }
  