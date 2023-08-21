
 /**
 * letterspacing 1.1v 2023-08-18
 */
 tinymce.PluginManager.add('endsIndent', function(editor, url) {
    var pluginName='两端缩进';
    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Tools');
    var endsIndent_val = editor.getParam('endsIndent', '0em 1em 2em 3em 4em 5em');
    editor.on('init', function() {
        editor.formatter.register({ 
            endsIndent: {  
                inline:'p',
                styles: { 'margin': '0 %value' },
            }
        });
    });
    var doAct = function (value) {
        doIndent(value);
    };
    function _indent2$getValue( key, str ) { 
        var m = str.match( new RegExp(key + ':?(.+?)"?[;}]') );
        return m ? m[ 1 ] : false;
    }
    function doIndent(value){
        var dom = editor.dom;
        var blocks = editor.selection.getSelectedBlocks();
        // global$1.each(blocks, function(block) {
        //     if(dom.getStyle(block,'margin')){
        //         let kv = "";
        //         // let kl = "";
        //         //  if(block&&block.children['0']&&block.children['0'].attributes&&block.children['0'].attributes.style){
        //         //    kv = _indent2$getValue('font-size',block.children['0'].attributes.style.textContent);
        //         //    kl = value;
        //         //    if(kv) {kv=(parseInt(kv)+parseInt((kl?kl:0)))*2+'px';}
        //         //    else kv=(parseInt((kl?kl:0))+16)*2+'px';
        //         //  }
        //         // dom.setStyle(block, 'margin', '0 '+kv?kv:'em');
        //         dom.setStyle(blocks, 'margin',value? '0 '+value:'0 2em');
        //     }
        // });
        dom.setStyle(blocks, 'margin',value? '0 '+value:'0 2em');
        editor.undoManager.transact(function(){
            editor.focus();
            editor.formatter.apply('endsIndent', { value: value });
        })
    }
    editor.ui.registry.getAll().icons.endsIndent || editor.ui.registry.addIcon('endsIndent','<svg t="1692327522929" class="icon" viewBox="0 0 1097 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4089"  width="24" height="24"><path d="M36.352 153.014857v-109.714286H1061.302857v109.714286H36.352z m222.061714 275.090286v-109.714286h583.753143v109.714286h-583.68z m0 290.377143v-109.714286h581.046857v109.714286H258.413714zM34.962286 999.350857v-109.714286h1024.292571v109.714286H34.962286zM34.084571 657.993143V375.296l164.571429 141.385143-164.571429 141.312z m1019.392-0.292572l-156.306285-142.262857 156.306285-142.189714v284.452571z" fill="#333333" p-id="4090"></path></svg>');
    editor.ui.registry.addMenuButton('endsIndent', {
        icon: 'endsIndent',
        tooltip: pluginName,
        fetch: function(callback) {
            var dom = editor.dom;
            var block = editor.selection.getStart();
            var lhv = 0;
            if(lhv==0){
                lhv = dom.getStyle(block,'margin') ? dom.getStyle(block,'margin') : 0;
            }
            var items = endsIndent_val.split(' ').map(function(item){
                var text = item;
                var value = item;
                return {
                    type: 'togglemenuitem',
                    text: text,
                    active : lhv==value ? true :false,
                    onAction: function() {
                        doAct(value);
                    }
                };
            });
            callback(items);
        }
    });

    return {
        getMetadata: function () {
            return  {
                name: pluginName,
                url: "www.yyyask.com",
            };
        }
    };
});