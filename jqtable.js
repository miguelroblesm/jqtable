var settings = new Object();
var dataList = [];
var page = 1;

(function($) {
  $.fn.jqtable = function(options) {
    settings = options;
    var selector = this;

    var queyString = ""; //"?pag=" + page + "&take=10";
    $.ajax({
      url: settings.url + queyString,
      method: "GET",
      success: function (result) {
        dataList = result;
        var $tbl = createTable();

        return selector.append($tbl);
      },
      error: function (error) {
        console.error(error);
      }
    });
  }
}(jQuery));

function createTable() {
  var $table = $("<table>");
  $table.addClass("table");
  var $thead = $("<thead>");
  var $trTitle = $("<tr>");
  $.each(settings.fields,
    function(index, item) {
      var $th = $("<th>");
      $th.html(item.title);
      $trTitle.append($th);
    });
  $thead.append($trTitle);
  $table.append($thead);

  var $tbody = $("<tbody>");
  $.each(dataList,
    function(index, item) {
      var $tr = $("<tr>");
      $.each(settings.fields,
        function (indexField, itemField) {
          var $td = $("<td>");
          var itemValue = item[itemField.dataField];
          if (itemField.format !== undefined) {
            itemValue = formatValue(itemField.format, itemValue);
          }
          $td.html(itemValue);
          $tr.append($td);
        });
      $tbody.append($tr);
    });
  $table.append($tbody);

  return $table;
}

function formatValue(format, value) {
  switch (format) {
  case "money":
    return "$" + parseFloat(value).toFixed(2);
  default:
    return value;
  }
}

function validateSettings() {
  var errors = [];
  if (settings.url === "") {
    errors.push("invalid URL");
  }

  if (errors.length > 0) {
    console.error(errors);
  }
}
