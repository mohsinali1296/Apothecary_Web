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
    <form action="{{route('addbrand')}}" method="POST" enctype="multipart/form-data">
        {{csrf_field()}}
        <div class="form-group"> 
            <label>Brand Name</label>
            <input type="text" name="Brand_Name" class="form-control" placeholder="Enter Brand Name">
        </div>

        <div class="form-group"> 
            <label>Sub Category Id</label>
            <input type="text" name="SubCategoryId" class="form-control" placeholder="Enter Sub Category Id">
        </div>

        <label> Image </label>
        <div class="input-group">
            <div class="custom-file">
            <input type="file" name="image" class="custom-file-input">
            <label class="custom-file-label"> Choose File </label>
            </div>
        </div>

        <button type="submit" name="submit" class="btn btn-primary"> Save Data </button>
    </form>
    </div>
</div>

    
</body>
</html>