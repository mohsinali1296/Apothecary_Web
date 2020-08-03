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
                     <h1>List Data CRUD</h1>
                     <a href="/listdata" class="btn btn-primary" > Add List Data </a>
            <table class="table table-stripped table-bordered">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">List_Id</th>
      <th scope="col">DataName</th> 
      <th scope="col">Image</th>
      <th scope="col">ImageUrl</th>
      <th scope="col">Description</th>
      <th scope="col">Deleted</th>
      <th scope="col">Edit</th>
    </tr>
  </thead>
  <tbody>
        @foreach ($listdata as $data)
    <tr>
      <th>{{ $data->Id }} </th>
      <th>{{ $data->List_Id }} </th>
      <th>{{ $data->DataName }} </th>
      <th><img src="{{ asset('uploads/images/'.$data->image )}}" width="100px;" height="100px;" alt="Image"> </th>
      <th>{{ $data->imageUrl }} </th>
      <th>{{ $data->description }} </th>
      <th>{{ $data->deleted }} </th> 
      <th><a href="/editlistdata/{{$data->Id}}" class= "btn btn-success"> Edit </a> </th> 
    </tr>
    @endforeach
  </tbody>
</table>

            </div>
     </div>

 </body>
 </html>