Ext.regApplication({
            name: 'app',
            launch: function() {
                var that = this;
                this.launched = true;

                console.log('Launched');

                db.init(function(){
                    db.seed();
                    that.views.viewport = new that.views.Viewport();
                });
            },
            mainLaunch: function() {
                if (!device || !this.launched) {
                    return;
                }
                //console.log('mainLaunch');
                alert('launched inside phonegap');
            }
        });
