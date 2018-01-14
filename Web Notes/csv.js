var CSV = {};
CSV.download = function(arrRows) {
    var rows = arrRows;
    // const rows = [
    //     ["name1", "city1", "some other info"],
    //     ["name2", "city2", "more info"]
    // ];
    let csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n"; // add carriage return
    });
    //var encodedUri = encodeURI(csvContent);
    //window.open(encodedUri);
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
}