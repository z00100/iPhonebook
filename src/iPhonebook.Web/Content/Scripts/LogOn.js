Ext.setup({
    icon: '/Content/Images/icon.png',
    tabletStartupScreen: '/Content/Images/tablet_startup.png',
    phoneStartupScreen: '/Content/Images/phone_startup.png',
    glossOnIcon: false,
    onReady: function() {
        
        var formBase = {
            url: 'postUser.php',
            standardSubmit: false,
            items: [
                {
                    xtype: 'fieldset',
                    //title: 'Login',
                    defaults: {
                        required: true,
                        labelAlign: 'left'
                    },
                    items: [{
                        xtype: 'textfield',
                        name : 'email',
                        label: 'Email',
                        autoCapitalize : false,
                        allowBlank: false,
                        minLength: 3, maxLength: 32
                    }, {
                        xtype: 'passwordfield',
                        name : 'password',
                        label: 'Password'
                    }]
                }
            ],
            listeners : {
                submit : function(form, result){
                    console.log('success', Ext.toArray(arguments));
                },
                exception : function(form, result){
                    console.log('failure', Ext.toArray(arguments));
                }
            },
        
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    layout: { pack: 'right' },
                    items: [
                        {
                            text: 'Login',
                            ui: 'confirm',
                            handler: function() {
                                if(formBase.user){
                                    form.updateModel(formBase.user, true);
                                }
                                form.submit({
                                    waitMsg : {message:'Submitting', cls : 'demos-loading'}
                                });
                            }
                        }
                    ]
                }
            ]
        };
        
        if (Ext.is.AndroidOS) {
            formBase.items.unshift({
                xtype: 'component',
                styleHtmlContent: true,
                html: '<span style="color: red">Forms on Android are currently under development. We are working hard to improve this in upcoming releases.</span>'
            });
        }
        
        if (Ext.is.Phone) {
            formBase.fullscreen = true;
        } else {
            Ext.apply(formBase, {
                autoRender: true,
                floating: true,
                modal: true,
                centered: true,
                hideOnMaskTap: false

                //height: 385,
                //width: 480
            });
        }
        
        form = new Ext.form.FormPanel(formBase);
        form.show();
    }
});