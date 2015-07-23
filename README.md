# Options

### Body


```javascript
MustangModal.popup({ body: "Hello world." }).open();
```

### Title

```javascript
MustangModal.popup({ body: "Hello world.", title: "This is a title" }).open();
```

### Width & Height

```javascript
  MustangModal.popup({

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

