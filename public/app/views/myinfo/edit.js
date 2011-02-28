app.views.MyinfoEdit = Ext.extend(Ext.Panel, {

    dockedItems: [
        {
            xtype: 'toolbar',
            title: 'My Info',
            items: [
                {
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
                    id: 'save_myinfo',
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
            id: 'myinfo_form',
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
                            placeHolder: '111, Lawrence Street..',
                            name: 'address',
                            label: 'Address'
                        },
                        {
                            xtype: 'textfield',
                            placeHolder: 'New York',
                            name: 'city',
                            label: 'City'
                        },
                        {
                            xtype: 'textfield',
                            placeHolder: 'NY',
                            name: 'state',
                            label: 'State'
                        },
                        {
                            xtype: 'textfield',
                            placeHolder: '000-000-0000',                            
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
                            placeHolder: '111, Lawrence Street..',
                            name: 'emergency_address',
                            label: 'Address'
                        },
                        {
                            xtype: 'textfield',
                            placeHolder: 'New York',
                            name: 'emergency_city',
                            label: 'City'
                        },
                        {
                            xtype: 'textfield',
                            placeHolder: 'NY',
                            name: 'emergency_state',
                            label: 'State'
                        },
                        {
                            xtype: 'textfield',
                            placeHolder: '000-000-0000',
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
        var form = this.getComponent('myinfo_form');
        form.load(myinfo)

        var toolbar = this.getDockedItems()[0];
        toolbar.getComponent('save_myinfo').record = myinfo;
        toolbar.getComponent('save_myinfo').form = form;
    }
});