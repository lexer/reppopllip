app.views.DoctorsList = Ext.extend(Ext.Panel, {
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Doctors'
    }],
    items: [{
        xtype: 'list',
        store: app.stores.doctors,
        itemTpl: '{id} {name}',
        itemSelector:'div.thumb-wrap',
        onItemDisclosure: function (record) {
            //Ext.dispatch({
            //    controller: app.controllers.contacts,
            //    action: 'show',
            //    id: record.getId()
            //});
        }
    }],
    initComponent: function() {
//        app.stores.doctors.load();
        app.views.DoctorsList.superclass.initComponent.apply(this, arguments);
    }
});