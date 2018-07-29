# Simple Image Annotator

## Description
Fork of spg715 Image annotator tool. This fork improves the usability by showing the user the drawn bounding box and
will output a csv that is ready to use with the turicreate object detection framework.

## Install
* Install Flask
```
$ pip install Flask
```

## Getting started
* cd into this directory after cloning the repo
* start the app
```
$ python app.py /images/directory
```
* you can also specify the file you would like the annotations output to (out.csv is the default)
```
$ python app.py /images/directory --out test.csv
```
* open http://127.0.0.1:5000/tagger in your browser
    * only tested on Chrome

## Output
* in keeping with simplicity, the output is to a csv file with the following fields
    * *name* - name of the image file
    * *label* - given label for the bounding box
    * *height* - height of the bounding box
    * *width* - width of the bounding box
    * *x* - the x coordinate of the bounding boxes center
    * *y* - the y coordinate of the bounding boxes center

## HOWTOs
* draw a bounding box
  * click on the image in the location of the first corner of the bounding box you would like to add
  * click again for the second corner and the box will be drawn
* add a label for a box
  * for the box you would like to give a label, find its id (noted in the top left corner of the box)
  * find the label with the corresponding number
  * enter the name you want in the input field
  * press enter
* move to next image
  * click the blue arrow button at the bottom of the page (depending on the size of the image you may have to scroll down)
* remove label
  click the red button on the label you would like to remove
* check generated data
  * at the top level of the directory where the program was run, there should be a file called out.csv that contains the generate data
