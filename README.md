# jqtable
A simple jQuery table

Data Table made with jQuery

Sample configuration

<pre><code>
<script src="/jqtable.js"></script>
<script>
    $(function() {
        $("#tblProducts").jqtable({
            url: "../api/products",
            fields: [
                {
                    title: "Id",
                    dataField: "id"
                },
                {
                    title: "Name",
                    dataField: "productName"
                },
                {
                    title: "Price",
                    dataField: "listPrice",
                    format: "money"
    }
            ]
        });
    });
</script>
  </code></pre>
