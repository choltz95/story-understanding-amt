## Project
Mechanical Turk Hit for collecting story completion data.

## Usage and instructions
### Testing
$cd rendered_templates/  <br />
$sh start_server.sh

## Important files & directories
**hit_properties/**: AMT property directory <br />
**story_understanding.json**: defines the properties of the HIT: title, keywords, price, etc. <br />
**hit_templates/**:  HIT UI directory <br />
**rendered_templates/**:  Rendered template directory <br />
**tmp/**:  Should be renamed to hit_data/. Contains input, hit ids, results. <br />
**readme.md**: This file <br />
**config.json**:  Project config file - contains some global variables. [git ignored] <br />
**.py**: AMT interface program  <br />
**.sh**: Interface

# Program overview

### HIT layout

### Program process

## TODO

## References
[0]Story Cloze Evaluation Test http://research.microsoft.com/en-us/um/people/pkohli/papers/cloze_test_naacl2016.pdf <br />
[1]Rocstories Corpus http://cs.rochester.edu/nlp/rocstories/