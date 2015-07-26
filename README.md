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
### Open Iframe

```javascript
	MustangModal.prop({ title: "Open Iframe Example" }).openIframe("IframePage.html").open();
```

### Change Body
```javascript
	MustangModal.prop({
       title: "Change Body Example",
       body: "If you want to change the body you can click 'Change The Body' button.",
       buttons: [
       {
           text: "Change The Body",
           type: "warning",
           callback: function () {
                    MustangModal.changeBody($("#openTable").html());
           }
       },
       {
           text: "Close",
           type: "danger",
           callback: function () {
               MustangModal.close();
           }
       }]
       }).open();
```
### Multi Modal
```javascript
//Open new modal
   MustangModal.prop({
   title: "Multi Modal Example",
   buttons: [
   {
       text: "Open New Modal",
       type: "warning",
       callback: function () {
                        
           //Open new modal 1
           MustangModal.prop({
               title: "New Modal 1",
               width: 400,
               height: 300,
               buttons: [
               {
                   text: "Open New Modal",
                   type: "success",
                   callback: function () {
                       //Open new modal 2
                       MustangModal.prop({
                           title: "New Modal 2",
                           body: "",
                           width: 600,
                           height: 400,
                           buttons: [
                               {
                                   text: "Open New Modal 3",
                                   type: "warning",
                                   callback: function () {
                                       //Open new modal 3
                                       MustangModal.prop({
                                           title: "New Modal 3",
                                           body: "",
                                           width: 400,
                                           height: 250,
                                           buttons: [
                                               {
                                                   text: "Open New Modal",
                                                   type: "primary",
                                                   callback: function () {
                                                   }
                                               },
                                               {
                                                   text: "Close",
                                                   type: "danger",
                                                   callback: function () {
                                                       MustangModal.close();
                                                   }
                                               }
                                           ]
                                       }).open(); 
                                   }
                               },
                               {
                                   text: "Close",
                                   type: "danger",
                                   callback: function () {
                                       MustangModal.close();
                                   }
                               }
                           ]
                       }).open();
                   }
               }, {
                   text: "Close",
                   callback: function () {
                       MustangModal.close();
                   }
               }]
           }).open();
       }
   }, {
       text: "Close",
       callback: function () {
           MustangModal.close();
       }
   }]
   }).open();

```

will be updated...
