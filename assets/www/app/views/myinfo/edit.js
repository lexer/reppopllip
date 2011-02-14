app.views.MyInfoEdit = Ext.extend(Ext.Panel, {
     dockedItems: [
         {
             xtype: 'toolbar',
             title: 'My Info',
             items: [
                 {
                      id: 'cancel',
                      text: 'Cancel',
                      ui: 'back',
                      listeners: {
                          'tap' : function() {
                              Ext.dispatch({
                                    controller: app.controllers.myinfo,
                                    action: 'show',
                                    animation: {type:'slide', direction:'right'}
                              });
                          }
                      }
                 },
                 {xtype:'spacer'},
                 {
                     id: 'save',
                     text: 'Save',
                     ui: 'action',
                     listeners: {
                         'tap' : function() {
                             this.form.updateRecord(this.record, true);
                             Ext.dispatch({
                                    controller: app.controllers.myinfo,
                                    action: 'update',
                                    myinfo: this.record
                             });
                         }
                     }
                 }
             ]
         }
     ],
     submitOnAction: false,
     items: [
         {
             id: 'my_contact_info',
             xtype: 'form',
             submitOnAction: false,
             items:  [
                 {
                     xtype: 'fieldset',
                     title: "My Contact Information",
                     items: [
                         {
                             xtype: 'textfield',
                             name: 'name',
                             label: 'name'
                         },
                         {
                             xtype: 'textfield',
                             name: 'address',
                             label: 'address'
                         },
                         {
                            xtype: 'textfield',
                            name: 'city',
                            label: 'city'
                         },
                         {
                             xtype: 'textfield',
                             name: 'state',
                             label: 'state'
                         },
                         {
                             xtype: 'textfield',
                             name: 'phone',
                             label: 'phone'
                         },
                         {
                             xtype: 'textfield',
                             name: 'email',
                             label: 'email'
                         }
                     ]
                 },
                 {
                 xtype: 'fieldset',
                 title: "Emergency Contact",
                 items: [
                     {
                         xtype: 'textfield',
                         name: 'emergency_name',
                         label: 'name'
                     },
                     {
                         xtype: 'textfield',
                         name: 'emergency_address',
                         label: 'address'
                     },
                     {
                        xtype: 'textfield',
                        name: 'emergency_city',
                        label: 'city'
                     },
                     {
                         xtype: 'textfield',
                         name: 'emergency_state',
                         label: 'state'
                     },
                     {
                         xtype: 'textfield',
                         name: 'emergency_phone',
                         label: 'phone'
                     },
                     {
                         xtype: 'textfield',
                         name: 'emergency_email',
                         label: 'email'
                     }
                 ]
             }
             ]
         }
     ],
     updateWithRecord: function(myinfo) {
        var form = this.getComponent('my_contact_info');
        form.load(myinfo)

         var toolbar = this.getDockedItems()[0];
        toolbar.getComponent('save').record = myinfo;
        toolbar.getComponent('save').form = form;
     }
});