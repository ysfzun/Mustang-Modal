# Installing

You can install in nuget 

**Install-Package mustang-modal**

Use the scripts:

```html
  <link href="/Styles/mustang-modal.css" rel="stylesheet" />
  <script src="/Scripts/mustang-modal.js"></script>
```

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
                    style: "primary",				//Optional field. This field uses bootstrapt button types. Default type is "default". 
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


### Click Close

```javascript
MustangModal.prop({

                body: "Hello world.",
                title: "This is a title",
                animate: "toggle",
                speed: 1000,
                clickClose: true				//Optional field. Allows the user to close the modal by pressing "Mouse Right Click". Default value is false.

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
           style: "warning",
           callback: function () {
                    MustangModal.changeBody($("#openTable").html());
           }
       },
       {
           text: "Close",
           style: "danger",
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
       style: "warning",
       callback: function () {
                        
           //Open new modal 1
           MustangModal.prop({
               title: "New Modal 1",
               width: 400,
               height: 300,
               buttons: [
               {
                   text: "Open New Modal",
                   style: "success",
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
                                   style: "warning",
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
                                                   style: "primary",
                                                   callback: function () {
                                                   }
                                               },
                                               {
                                                   text: "Close",
                                                   style: "danger",
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
                                   style: "danger",
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

### Cross Window Interactions

There are three way for this interactions at the moment. These methods are **load**, **iframe** and **changeBody**.

Firstly you must use **eq** method. With this method you can select a modal. And then, you can continue to process. :)

**load** : This method takes three parameters. These, url, parameters and callback.

 For example:

```javascript
 MustangModal.eq(0).load("/Examples/DummyData/_AjaxLoadingPartial.html");
```

```javascript
MustangModal.prop({
     title: "Cross Window Interactions Example",
     body: "Click the red button to view load example.",
     width: 700,
     height: 50,
     buttons: [
     {
         text: "Click Me!",
         style: "danger",
         callback: function () {
             MustangModal.prop({
                 title: "Question ?",
                 body: "Are you sure ?",
                 width: 300,
                 height: 25,
                 buttons: [
                     {
                         text: "Yes",
                         style: "success",
                         callback: function () {
                             //will be loaded to zero modal
                            MustangModal.eq(0).load("/Examples/DummyData/_AjaxLoadingPartial.html", function () {
                                 MustangModal.close();
                             });
                         }
                     }, {
                         text: "No",
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
```

**iframe** : This method takes only url.

For example:

```javascript
MustangModal.eq(0).iframe("http://www.aksesuarpaketi.com");
```

```javascript
MustangModal.prop({
      title: "Cross Window Interactions Example",
      body: "Click the red button to view iframe example.",
      width: 700,
      height: 50,
      buttons: [
      {
          text: "Click Me!",
          style: "danger",
          callback: function () {
              MustangModal.prop({
                  title: "Question ?",
                  body: "Are you sure ?",
                  width: 300,
                  height: 25,
                  buttons: [
                      {
                          text: "Yes",
                          style: "success",
                          callback: function () {

                              //will be loaded to zero modal
                              MustangModal.eq(0).iframe("your site url");
                              MustangModal.close();
                          }
                      }, {
                          text: "No",
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

```

**changeBody** : This method takes html parameter.

For example:
	
```javascript
MustangModal.eq(0).changeBody($("#openTable").html());
```

```javascript
MustangModal.prop({
     title: "Cross Window Interactions Example",
     body: "Click the red button to view changeBody example.",
     width: 700,
     height: 25,
     buttons: [
     {
         text: "Click Me!",
         style: "danger",
         callback: function () {
             MustangModal.prop({
                 title: "Question ?",
                 body: "Are you sure ?",
                 width: 300,
                 height: 25,
                 buttons: [
                     {
                         text: "Yes",
                         style: "success",
                         callback: function () {
                             
                             //will be loaded to zero modal
							 MustangModal.eq(0).changeBody($("#openTable").html());
                             MustangModal.close();
                         }
                     }, {
                         text: "No",
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

```

**width & height** : These methods take width and height values.

For example:

```javascript
MustangModal.eq(0).width(400); 
MustangModal.eq(0).height(200);
```

```javascript
MustangModal.prop({
     title: "Cross Window Interactions Example - Width & Height",
     body: "Click the red button to view changeBody example.",
     width: 700,
     height: 25,
     buttons: [
     {
         text: "Click Me!",
         style: "danger",
         callback: function () {
             MustangModal.prop({
                 title: "Question ?",
                 body: "Are you sure ?",
                 width: 300,
                 height: 25,
                 buttons: [
                     {
                         text: "Yes",
                         style: "success",
                         callback: function () {
                             //will be loaded to zero modal
                             MustangModal.eq(0).load("/Examples/DummyData/_AjaxLoadingPartial.html",functio(){
                               
                    MustangModal.eq(0).width(400); 
                    MustangModal.eq(0).height(200); 
                                
                                 MustangModal.close();
                             });
                         }
                     }, {
                         text: "No",
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
```

**resetResize** : This method sets the height and width values as automatically.

```javacsript
MustangModal.eq(0).resetResize();
```

```javascript
MustangModal.prop({
     title: "Cross Window Interactions Example - Reset Resize",
     body: "Click the red button to view changeBody example.",
     width: 700,
     height: 25,
     buttons: [
     {
         text: "Click Me!",
         style: "danger",
         callback: function () {
             MustangModal.prop({
                 title: "Question ?",
                 body: "Are you sure ?",
                 width: 300,
                 height: 25,
                 buttons: [
                     {
                         text: "Yes",
                         style: "success",
                         callback: function () {
                             //will be loaded to zero modal
                             MustangModal.eq(0).load("/Examples/DummyData/_AjaxLoadingPartial.html",functio(){
                               
                    MustangModal.eq(0).resetResize(); 
                                
                                 MustangModal.close();
                             });
                         }
                     }, {
                         text: "No",
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
```

### onOpen & onClose Events

```javascript
MustangModal.prop({
     body: "onOpen and onClose example.",
     onClose: function () {
        alert("modal is closed");
     },
     onOpen: function () {
        alert("modal is opened.");
     }
     }).open();
```

### Attaching To a And button Elements

Firstly you must add m-modal to class attribute.

**load:** If you set data-type as load will be ajax request.
```html
<button class="btn btn-danger m-modal" data-title="Sample Title" data-type="load" data-target="/Examples/DummyData/_AjaxLoadingPartial.html">
                        Open Modal With Modal
                        </button>
```

**iframe:** If you set data-type as load will be open url in iframe.
```html
 <button class="btn btn-danger m-modal"
                            data-title="Sample Title" data-type="iframe"data-height="500" data-target="http://www.aksesuarpaketi.com">
                        Open Modal With Iframe
                    </button>
```

**iframe:** If you set data-type as html, the modal will be open html. 
```html
 <button class="btn btn-danger m-modal"
                            data-title="Sample Title" data-type="html" data-target="#openTable">
                        Open Modal With Html
                    </button>
```
### allowAutoClose

```javascript
MustangModal.prop({ body: "Hello world.", allowAutoClose: 2000 }).open();
```
