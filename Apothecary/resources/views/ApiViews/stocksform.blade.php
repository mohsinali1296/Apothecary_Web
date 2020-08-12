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
                     <h1>Stocks CRUD</h1>
                     <a href="/stock" class="btn btn-primary" >Add Stocks Data </a>
            <table class="table table-stripped table-bordered">
  <thead>
    <tr>
    <th scope="col">Image</th>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">Item Description</th> 
      <th scope="col">Item Detail Description</th>
      <th scope="col">Formula</th>
      <th scope="col">Pharm Id</th>
      <th scope="col">Category Id</th>
      <th scope="col">Sub Category</th>
      <th scope="col">Brand</th>
      <th scope="col">Image Url</th>
      <th scope="col">DOE</th>
      <th scope="col">Unit Qty</th>
      <th scope="col">Qty Per Leaf/th>
      <th scope="col">Qty Per Box</th>
      <th scope="col">Unit Price</th>
      <th scope="col">Leaf Price</th>
      <th scope="col">Pack Price</th>
      <th scope="col">Profit Price</th>
      <th scope="col">Barcode</th>
      <th scope="col">Deleted</th>
      <th scope="col">Expired</th>
      <th scope="col">Available</th>
      <th scope="col">Unit Buy Price</th>
      <th scope="col">Edit</th>
      <th scope="col">Add</th>
      

    </tr>
  </thead>
  <tbody>
        @foreach ($stock as $data)
    <tr>
    <th><img src="{{ asset('uploads/images/'.$data->image )}}" width="100px;" height="100px;" alt="Image"> </th>
      <th>{{ $data->Id }} </th>
      <th>{{ $data->Name }} </th>
      <th>{{ $data->Item_Description }} </th>
      <th>{{ $data->Item_Detailed_Description }} </th>
      <th>{{ $data->Formula }} </th>
      <th>{{ $data->Pharm_Id }} </th>
      <th>{{ $data->Category_Id }} </th>
      <th>{{ $data->sub_category }} </th>
      <th>{{ $data->Brand }} </th>
      
      <th>{{ $data->imageUrl }} </th>
      <th>{{ $data->DOE }} </th>
      <th>{{ $data->unit_Qty }} </th>
      <th>{{ $data->qty_per_leaf }} </th>
      <th>{{ $data->qty_per_box }} </th> 
      <th>{{ $data->unit_price }} </th>
      <th>{{ $data->leaf_price }} </th>
      <th>{{ $data->box_price }} </th> 
      <th>{{ $data->Profit_Price }} </th>
      <th>{{ $data->Barcode }} </th>
      <th>{{ $data->deleted }} </th> 
      <th>{{ $data->expired }} </th>
      <th>{{ $data->Available }} </th>
      <th>{{ $data->unit_ButPrice }} </th> 
      <th><a href="/editstockdata/{{$data->Id}}" class= "btn btn-success"> Edit </a> </th>
      <th><a href="/addstock/{{$data->Id}}" class= "btn btn-success"> Add </a> </th>

    </tr>
    @endforeach
  </tbody>
</table>

            </div>
     </div>

 </body>
 </html>