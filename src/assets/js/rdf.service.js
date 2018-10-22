const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');

async function RDFHelper(webId)
{
    var rdf = new RDFService({ webId : webId });
    await rdf.load();
    return rdf;
}

var RDFService = function (options) {
 
    /*
     * Variables accessible
     * in the class
     */
    var vars = {
        webId  : null,
        store : null,
        fetcher : null
    };
 
    /*
     * Can access this.method
     * inside other methods using
     * root.method()
     */
    var root = this;
 
    /*
     * Constructor
     */
    this.construct = function(options){
        $.extend(vars , options);

        if(vars.webId === '' || vars.webId === undefined, vars.webId === null)
        {
            console.error('WebId required on the RDFHelper constructor');
            return;
        }
    };

    this.load = async function()
    {
        vars.store = $rdf.graph();
        vars.fetcher = new $rdf.Fetcher(vars.store);
    
        // Load the person's data into the store
        await vars.fetcher.load(vars.webId);
    }
    
    this.getValueFromVCard = function(node, webId) {
        return root.getValueFromNamespace(node, VCARD, webId)
    }

    this.getValueFromFOAF = function(node, webId) {
        return root.getValueFromNamespace(node, FOAF, webId)
    }

    this.getValueFromNamespace = function(node, namespace, webId) {
        var store = vars.store.any($rdf.sym(webId || vars.webId), namespace(node));
        if (store) {
          return store.value;
        }
        return '';
    }
  
    /*
     * Pass options when class instantiated
     */
    this.construct(options);
};


