export default function convertDateFormat(date){
    // Preparing nice date format, Ex: Dec 14, 2017
    var d = new Date(date);
    var day = d.getDate().toString();
    var month = d.toLocaleString('default', { month: 'short' })
    var year = d.getFullYear().toString();
    // Putting all together in one string
    var finalString = month + ' ' + day + ', ' + year;
    return finalString;
}