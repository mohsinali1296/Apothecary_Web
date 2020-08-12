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
    <h1>Update List Data Form</h1>
    <a href="/viewlistdata" class="btn btn-primary" > View List Data </a>
    <form action="/updatelistdataentry/{{$listdata->Id}}" method="POST" enctype="multipart/form-data">
        {{csrf_field()}}
        {{method_field('PUT')}}
        <input type="hidden" name='Id' id='Id' value="{{ $listdata->Id }}">

        <div class="form-group"> 
            <label>Data Name</label>
            <input type="text" name="DataName" class="form-control"  value="{{$listdata->DataName}}" placeholder="Enter Data Name">
        </div>

        <div class="form-group"> 
            <label>List Id</label>
            <input type="text" name="List_Id" class="form-control"  value="{{$listdata->List_Id}}" placeholder="Enter List Id">
        </div>


        <div class="form-group">
            <label>Description</label>
            <textarea name="description" cols="80" rows="40"  value="{{$listdata->description}}" placeholder="Description" 
                resize= "vertical" id="description"
            ></textarea>
        </div>

        <script src="//cdn.ckeditor.com/4.13.1/standard/ckeditor.js"></script>
        <script>
            CKEDITOR.replace( 'description', {
            filebrowserUploadUrl: "{{route('upload', ['_token' => csrf_token() ])}}",
            filebrowserUploadMethod: 'form'
            });
        </script>

        <div class="form-group"> 
            <label>Image URL</label>
            <input type="text" name="imageUrl" class="form-control"  value="{{$listdata->imageUrl}}" placeholder="Enter Image Url">
        </div>

        <label>Image</label>
        <div class="input-group">
            <div class="custom-file">
            <input type="file" name="image" class="custom-file-input"  value="{{$listdata->image}}" >
            <label class="custom-file-label"> Choose File </label>
            </div>
        </div>

        <button type="submit" name="submit" class="btn btn-primary"> Save Data </button>
    </form>
    </div>
</div>

    
</body>
</html>