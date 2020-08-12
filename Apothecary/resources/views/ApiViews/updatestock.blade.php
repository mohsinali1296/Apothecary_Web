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
   <h1>Update Stock Form</h1>
    <a href="/viewstock" class="btn btn-primary" >View Stocks </a>
    <form action="/updatestockdataentry/{{$stock->Id}}" method="POST" enctype="multipart/form-data">
        {{csrf_field()}}
        {{method_field('PATCH')}}

        <input type="hidden" name='Id' id='Id' value="{{ $stock->Id }}">

        <div class="form-group"> 
            <label>Product Name</label>
            <input type="text" name="Name" class="form-control" value="{{ $stock->Name }}" placeholder="Enter Product Name">
        </div>

        <div class="form-group"> 
            <label>Item Description</label>
            <input type="text" name="Item_Description" class="form-control" value="{{ $stock->Item_Description }}" placeholder="Enter Item Description">
        </div>

        <!--cols="80" rows="50"
        !!html_entity_decode($text)!!
        -->
        <div class="form-group">
            <label>Item Detailed Description</label>
            <textarea name="Item_Detailed_Description" cols="80" rows="40" value= "html_entity_decode($stock->Item_Detailed_Description)" placeholder="Enter Item Detailed Description" 
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
            <input type="number" name="Pharm_Id" class="form-control" value="{{ $stock->Pharm_Id }}" placeholder="Enter Pharm Id">
        </div>

        <div class="form-group"> 
            <label>Formula Id</label>
            <input type="number" name="Formula" class="form-control" value="{{ $stock->Formula }}" placeholder="Enter Formula Id">
        </div>

        <div class="form-group"> 
            <label>Brand Id</label>
            <input type="number" name="Brand" class="form-control" value="{{ $stock->Brand }}" placeholder="Enter Brand Id">
        </div>

        <div class="form-group"> 
            <label>Category Id</label>
            <input type="number" name="Category_Id" class="form-control" value="{{ $stock->Category_Id }}" placeholder="Enter Category Id">
        </div>

        <div class="form-group"> 
            <label>Sub Category Id</label>
            <input type="number" name="sub_category" class="form-control" value="{{ $stock->sub_category }}" placeholder="Enter Sub Category Id">
        </div>

        <div class="form-group"> 
            <label>Barcode</label>
            <input type="text" name="Barcode" class="form-control" value="{{ $stock->Barcode }}" placeholder="Enter Barcode">
        </div>

        <div class="form-group"> 
            <label>Unit Qty</label>
            <input type="number" name="unit_Qty" class="form-control" value="{{ $stock->unit_Qty }}" placeholder="Enter Unit Qty">
        </div>

        <div class="form-group"> 
            <label>Qty per Leaf</label>
            <input type="number" name="qty_per_leaf" class="form-control" value="{{ $stock->qty_per_leaf }}" placeholder="Enter Qty Per Leaf">
        </div>

        <div class="form-group"> 
            <label>Qty per Pack</label>
            <input type="number" name="qty_per_box" class="form-control" value="{{ $stock->qty_per_box }}" placeholder="Enter Qty Per Pack">
        </div>

        <div class="form-group"> 
            <label>Unit Price</label>
            <input type="number" name="unit_price" class="form-control" value="{{ $stock->unit_price }}" placeholder="Enter Unit Price">
        </div>

        <div class="form-group"> 
            <label>Leaf Price</label>
            <input type="number" name="leaf_price" class="form-control" value="{{ $stock->leaf_price }}" placeholder="Enter Leaf Price">
        </div>

        <div class="form-group"> 
            <label>Pack Price</label>
            <input type="number" name="box_price" class="form-control" value="{{ $stock->box_price }}" placeholder="Enter Pack Price">
        </div>

        <div class="form-group"> 
            <label>DOE</label>
            <input type="date" name="DOE" class="form-control" value="{{ $stock->DOE }}">
        </div>

        <div class="form-group"> 
            <label>Profit Price</label>
            <input type="number" name="Profit_Price" class="form-control" value="{{ $stock->Profit_Price }}" placeholder="Enter Profit Price">
        </div>

        <div class="form-group"> 
            <label>Buy Price</label>
            <input type="number" name="unit_BuyPrice" class="form-control" value="{{ $stock->unit_BuyPrice }}" placeholder="Enter Buy Price">
        </div>

        <div class="form-group"> 
            <label>Expired</label>
            <input type="number" name="expired" class="form-control" value="{{ $stock->expired }}" placeholder="Expired or Not">
        </div>

        <div class="form-group"> 
            <label>Avialable</label>
            <input type="number" name="Available" class="form-control" value="{{ $stock->Available }}" placeholder="Available or not">
        </div>

        <div class="form-group"> 
            <label>Deleted</label>
            <input type="number" name="deleted" class="form-control" value="{{ $stock->deleted }}" placeholder="Deleted or not">
        </div>

        <div class="form-group"> 
            <label>Image URL</label>
            <input type="text" name="imageUrl" class="form-control" value="{{ $stock->imageUrl }}" placeholder="Enter Image URL">
        </div>

        <label>Image</label>

        <div class="input-group">
            <div class="custom-file">
            <input type="file" name="image" class="custom-file-input" value="{{ $stock->image }}">
            <label class="custom-file-label"> Choose Image File </label>
            </div>
        </div>


        <button type="submit" name="submit" class="btn btn-primary"> Save Data </button>
    </form>
    </div>
</div>

    
</body>
</html>