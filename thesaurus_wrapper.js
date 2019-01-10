/****************************************************************
* Wait for page load, click review tab, scrape contents
* Print reviews and dates of review from bestbuy
* Unable to use jQuery
*****************************************************************/

var casper = require("casper").create({
    verbose: true,
    logLevel: 'error',     // debug, info, warning, error
    pageSettings: {
      loadImages: false,
      loadPlugins: false,
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    },
    clientScripts: ["vendor/jquery.min.js", "vendor/lodash.js"]
  });
  


  // Skip Certain Resources
casper.options.onResourceRequested = function(casper, requestData, request) {
    // If any of these strings are found in the requested resource's URL, skip this request.
    var skip = [
      'googleads.g.doubleclick.net',
      'cm.g.doubleclick.net',
      'www.googleadservices.com',
      'advertisement',
      'analytics'
    ];
  
    skip.forEach(function(needle) {
      if (requestData.url.indexOf(needle) > 0) {
        request.abort();
      }
    })
  };

  casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg);
    })
  
  var url = 'http://www.thesaurus.com/browse/';
  
  var synset_def = [];

  var synset_pos = [];

  var fs = require('fs');

//document.querySelectorAll('section.antonyms li span').map(span => span.textContent)

var pathIn;
var pathOut;
var dict_out = {}
var words = []

function getNumberOfSynsets(){

  return $(".filters div[class='synonym-description']").length

};  


function getSynsetData(n,searchword){
 var ids = []
 for (var i = 0; i <  n; i++) {
      ids.push(i);
  }
 return  _.map(ids, function(id){
        var synset = $("#synonyms-"+id);
        var synonims = $("#synonyms-"+id+" div.relevancy-list span.text")
        var words_s = _.map(synonims,function(value){
        return value.innerHTML;})
        if( $("#synonyms-"+id+"  section.container-info.antonyms").length )         
        {
          var antinomies = $("#synonyms-"+id+"  section.container-info.antonyms span.text")
          var words_a = _.map(antinomies,function(value){
          return value.innerHTML;})
          return {
            word:searchword,
            pos:$(synset).find('em.txt')[0].innerHTML,
            def:$(synset).find('strong.ttl')[0].innerHTML,
            synonimswords:words_s,
            antinomieswords:words_a
          } 
        }
        else{
          console.log('not antinomies');
          return {
            word:searchword,
            pos:$(synset).find('em.txt')[0].innerHTML,
            def:$(synset).find('strong.ttl')[0].innerHTML,
            synonimswords:words_s
          }
        }
       
  

  });
 

}; 



casper.start();


casper.then(function(){
 if(!casper.cli.get('input') || !casper.cli.has('output') ){
   this.echo('you should use the input and output argument for the script')
    this.exit();
 }

 this.pathIn = casper.cli.get('input');
 this.pathOut = casper.cli.get('output');
 this.echo(this.pathIn)
 this.echo(this.pathOut)


});

casper.then(function readFile() {
    var stream = fs.open(this.pathIn, 'r');
    while (!stream.atEnd()) {
        words.push(stream.readLine());
    }
    words.filter( function(item, pos, self){ self.indexOf(item) == pos})

    stream.close();
});



casper.then(function(){
    casper.each(words, function(self, word) {
        self.thenOpen( url+word, function(){
          this.echo('------ quering-----')
          this.echo(word)  
          var num_synsets = this.evaluate(getNumberOfSynsets);
          this.echo('Number of synsets: '+num_synsets)
          dict_out[word]=this.evaluate(getSynsetData,num_synsets,word);
          this.echo('----done-----')
        })
       
      });
});
casper.then(function(){

  var output = JSON.stringify(dict_out);
  try {
      fs.write(this.pathOut,output,'a')
      } catch(e) {
          console.log(e);
      }

})
casper.run();
