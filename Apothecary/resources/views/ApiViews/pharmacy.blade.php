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
    <form action="{{route('addpharmacy')}}" method="POST" enctype="multipart/form-data">
        {{csrf_field()}}
        <div class="form-group"> 
            <label>Pharmacy Name</label>
            <input type="text" name="Pharm_Name" class="form-control" placeholder="Enter Pharmacy Name">
        </div>

        <div class="form-group"> 
            <label>Contact</label>
            <input type="text" name="Contact" class="form-control" placeholder="Enter Contanct no. ">
        </div>

        <div class="form-group"> 
            <label>Address</label>
            <input type="text" name="Pharmacy_Address" class="form-control" placeholder="Enter Address">
        </div>


        <div class="form-group"> 
            <label>Email</label>
            <input type="email" name="email" class="form-control" placeholder="Enter Email">
        </div>

        <div class="form-group"> 
            <label>Password</label>
            <input type="text" name="pass" class="form-control" placeholder="Enter Password">
        </div>

        <div class="form-group"> 
            <label>Latitude</label>
            <input type="number" step="any" 
            name="Latitude" formnovalidate class="form-control" placeholder="Enter Latitude">
        </div>

        <div class="form-group"> 
            <label>Longitude</label>
            <input type="number" step="any"
            name="Longitude" class="form-control" placeholder="Enter Longitude">
        </div>

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