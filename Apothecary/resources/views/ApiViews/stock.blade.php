<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<body>

<div class="container">

    <div class="jumbotron">
    <h1>Add Stock Form</h1>
    <a href="/viewstock" class="btn btn-primary" >View Stocks </a>
    <form action="{{route('addstockdata')}}" method="POST" enctype="multipart/form-data">
        {{csrf_field()}}
        <div class="form-group"> 
            <label>Product Name</label>
            <input type="text" name="Name" class="form-control" placeholder="Enter Product Name">
        </div>

        <div class="form-group"> 
            <label>Item Description</label>
            <input type="text" name="Item_Description" class="form-control" placeholder="Enter Item Description">
        </div>

        <!--cols="80" rows="50"-->
        <div class="form-group">
            <label>Item Detailed Description</label>
            <textarea name="Item_Detailed_Description" cols="80" rows="40" placeholder="Enter Item Detailed Description" 
                resize= "vertical" id="Item_Detailed_Description"
            ></textarea>
        </div>

        <script src="//cdn.ckeditor.com/4.13.1/standard/ckeditor.js"></script>
        <script>
            CKEDITOR.replace( 'Item_Detailed_Description', {
            filebrowserUploadUrl: "{{route('upload', ['_token' => csrf_token() ])}}",
            filebrowserUploadMethod: 'form'
            });
        </script>

        <div class="form-group"> 
            <label>Pharmacy Id</label>
            <input type="number" name="Pharm_Id" class="form-control" placeholder="Enter Pharm Id">
        </div>

        <div class="form-group"> 
            <label>Formula Id</label>
            <input type="number" name="Formula" class="form-control" placeholder="Enter Formula Id">
        </div>

        <div class="form-group"> 
            <label>Brand Id</label>
            <input type="number" name="Brand" class="form-control" placeholder="Enter Brand Id">
        </div>

        <div class="form-group"> 
            <label>Category Id</label>
            <input type="number" name="Category_Id" class="form-control" placeholder="Enter Category Id">
        </div>

        <div class="form-group"> 
            <label>Sub Category Id</label>
            <input type="number" name="sub_category" class="form-control" placeholder="Enter Sub Category Id">
        </div>

        <div class="form-group"> 
            <label>Unit Qty</label>
            <input type="number" name="unit_Qty" class="form-control" placeholder="Enter Unit Qty">
        </div>

        <div class="form-group"> 
            <label>Qty per Leaf</label>
            <input type="number" name="qty_per_leaf" class="form-control" placeholder="Enter Qty Per Leaf">
        </div>

        <div class="form-group"> 
            <label>Qty per Pack</label>
            <input type="number" name="qty_per_box" class="form-control" placeholder="Enter Qty Per Pack">
        </div>

        <div class="form-group"> 
            <label>Unit Price</label>
            <input type="number" name="unit_price" class="form-control" placeholder="Enter Unit Price">
        </div>

        <div class="form-group"> 
            <label>Leaf Price</label>
            <input type="number" name="leaf_price" class="form-control" placeholder="Enter Leaf Price">
        </div>

        <div class="form-group"> 
            <label>Pack Price</label>
            <input type="number" name="box_price" class="form-control" placeholder="Enter Pack Price">
        </div>

        <div class="form-group"> 
            <label>DOE</label>
            <input type="date" name="DOE" class="form-control" value="Y-m-d">
        </div>

        <label>Image</label>

        <div class="input-group">
            <div class="custom-file">
            <input type="file" name="image" class="custom-file-input">
            <label class="custom-file-label"> Choose Image File </label>
            </div>
        </div>

        <button type="submit" name="submit" class="btn btn-primary"> Save Data </button>
    </form>
    </div>
</div>

    
</body>
</html>