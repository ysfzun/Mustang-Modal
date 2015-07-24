# Options

### Body


```javascript
MustangModal.prop({ body: "Hello world." }).open();
```

### Title

```javascript
MustangModal.prop({ body: "Hello world.", title: "This is a title" }).open();
```

### Width & Height

```javascript
  MustangModal.prop({

                body: "Hello world.",
                title: "This is a title",
                width: 250,
                height: 100

            }).open();
```

### Buttons

```javascript
MustangModal.prop({

                body: "Hello world.",
                title: "This is a title",
                buttons: [
                {
                    id: "btnClose",  				//Optional field. If id not set, will be added random button id as automatically.
                    text: "Close",				    //Optional field. Default name is "Button Name".
                    type: "primary",				//Optional field. This field uses bootstrapt button types. Default type is "default". 
                    callback: function() {			

                        alert("clicked the close button");
                        MustangModal.close();
                    }
                }]

            }).open();
```

### Animation & Speed

```javascript

 MustangModal.prop({

                body: "Hello world.",
                title: "This is a title",
                animate: "toggle",				//Optional field. There are 3 types of animation types. These, top, toggle and opacity. top is default type.
                speed: 1000				    //Optional field. Default value 500. 

            }).open();

```

### Escape Close

```javascript
MustangModal.prop({

                body: "Hello world.",
                title: "This is a title",
                animate: "toggle",
                speed: 1000,
                escapeClose: true				//Optional field. Allows the user to close the modal by pressing "ESC". Default value is false.

            }).open();

```

#Features

### Ajax Loading

load method takes 3 parameters. These url, parameters and callback. 

```javascript
    MustangModal.prop({
                title: "Ajax Loading",
                animate: "toggle",
                speed: 1000,
                height: 250,
                escapeClose: true               
            }).load("AjaxLoading.html").open();

```


will be update...
