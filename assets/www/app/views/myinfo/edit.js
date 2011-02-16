app.views.myInfoEdit = new Ext.extend(Ext.Panel, {

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
    layout: 'fit',
    styleHtmlContent:false,
    items: [
        {
            id: 'my_contact_info',
            xtype: 'form',
            submitOnAction: false,
            scroll: "vertical",
            items:  [
                {
                    xtype: 'fieldset',
                    title: "My Contact Information",
                    items: [
                        {
                            xtype: 'textfield',
                            placeHolder: "John Doe",
                            name: 'name',
                            label: 'Name'
                        },
                        {
                            xtype: 'textfield',
                            name: 'address',
                            label: 'Address'
                        },
                        {
                            xtype: 'textfield',
                            name: 'city',
                            label: 'City'
                        },
                        {
                            xtype: 'textfield',
                            name: 'state',
                            label: 'State'
                        },
                        {
                            xtype: 'textfield',
                            name: 'phone',
                            label: 'Phone'
                        },
                        {
                            xtype: 'emailfield',
                            placeHolder: "john@doe.com",
                            name: 'email',
                            label: 'Email'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: "Emergency Contact",
                    items: [
                        {
                            xtype: 'textfield',
                            placeHolder: "John Doe",
                            name: 'emergency_name',
                            label: 'Name'
                        },
                        {
                            xtype: 'textfield',
                            name: 'emergency_address',
                            label: 'Address'
                        },
                        {
                            xtype: 'textfield',
                            name: 'emergency_city',
                            label: 'City'
                        },
                        {
                            xtype: 'textfield',
                            name: 'emergency_state',
                            label: 'State'
                        },
                        {
                            xtype: 'textfield',
                            name: 'emergency_phone',
                            label: 'Phone'
                        },
                        {
                            xtype: 'emailfield',
                            placeHolder: "john@doe.com",
                            name: 'emergency_email',
                            label: 'Email'
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