
# Important

- Data Scraping is not always legal, you should read the licence of the target website.
- thesaurus.com is choosen as example, the sample data have not not been used in any applications.
- The author is not responsible for incorrect use of the sw.
- Downloading data from thesaurus.com is not allowed.



# Data Scraping 
  

Script for crawling data from thesaurus.com from a list of input word using CasperJS

  
  

### Prerequisites

  

- PhantomJS  http://phantomjs.org/

- CasperJS  http://casperjs.org/

- npm  https://www.npmjs.com/

  
  

### Installing

  

- Install [PhantomJS](http://phantomjs.org/). In MACOS just brew install phantomJS


- Install locally [CasperJS](http://casperjs.org/) using npm , npm install --save casperjs

- PhantomJS develpment is suspended. The latest version (2.1) is fine
  
  

## Getting Started

  

```bash
node_modules/casperjs/bin/casperjs thesaurus_wrapper.js --input=list_verb.txt --output=result.json
```
  
## What the SW is doing

- It starts from an input list of verbs (--input=list_verb.txt), and it extracts a json file (--output=result.json) with antinomies, synonims and POS for each verb in the list.

- For example, if the verb 'change' is in the input list, and  thesaurus.com has two meanings for 'change' , then SW will write the following json file:
```json
[{"antinomieswords":["agreement","sameness","similarity","stagnation","uniformity","bill","dollar"],"def":"something made different; alteration","pos":"noun","synonimswords":["adjustment","advance","development","difference","diversity","innovation","modification","reversal","revision","revolution","shift","switch","transformation","transition","variation","about-face","addition","break","compression","contraction","conversion","correction","distortion","diversification","metamorphosis","modulation","mutation","novelty","permutation","reconstruction","refinement","remodeling","surrogate","tempering","transmutation","turn","turnover","variance","variety","vicissitude"],"word":"change"},{"antinomieswords":["dollar","bill"],"def":"substitution; replacement","pos":"noun","synonimswords":["switch","turnaround","interchange","conversion","exchange","trade","flip-flop","swap"],"word":"change"}]
```

## Authors

  *  **Antonio Penta** 
