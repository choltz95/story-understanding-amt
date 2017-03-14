## Introduction
Mechanical Turk Hit for collecting story completion data.

## Important files & directories
### Base Directory
**hit_properties/**: AMT property directory <br />
**story_understanding.json**: defines the properties of the HIT: title, keywords, price, etc. <br />
**hit_templates/**:  HIT UI directory <br />
**rendered_templates/**:  Rendered template directory <br />
**tmp/**:  Should be renamed to hit_data/. Contains input, hit ids, results. <br />
**readme.md**: This file <br />
**config.json**:  Project config file - contains some global variables. [git ignored] <br />
**.py**: AMT interface program  <br />
**.sh**: Interface

### HIT layout (in /hit_templates/)


## Usage and instructions
### Testing
$cd rendered_templates/  <br />
$sh start_server.sh

### Launching Hits
To launch a HITs in the AMT sandbox, run launch_hits.sh, which runs the following command:
```
python launch_hits.py \
  --html_template=story_understanding.html \
  --hit_properties_file=hit_properties/story_understanding.json \
  --input_json_file=tmp/example_input.txt \
  --hit_ids_file=tmp/hit_ids.txt
```
- The file `story_understanding.html` is a template that defines the UI of the HIT;
you can find it in `hit_templates/story_understanding.html`.
- The file `hit_properties/story_understanding.json` defines the properties of the HIT: title, keywords, price, etc.
- The file `tmp/example_input.txt` contains inputs for the stories you want to load. The input to each HIT is a JSON object, and the input file contains one such JSON object per line.
- The IDs of the created HITs are written to the file `tmp/hit_ids.txt`. You will use this file as input to other commands in order to operate on the batch of HITs that you just created.

*Note*: You may be seeing an error message scrolling repeatedly if you're setting up AMT for the first time, asking you to "Please log in to [https://requestersandbox.mturk.com/](https://requestersandbox.mturk.com/) and complete registration." You have to register on that URL first and then run again.

#### Do your HITs
Your HITs should now be live on the [Mechanical Turk sandbox](https://workersandbox.mturk.com/mturk/findhits).
Open the sandbox and search by "story understanding".
Complete one of the HITs.

#### Check HIT progress
You can check the status of your in-progress HITs by running "show_progress.sh", which contains the following command:
```
python show_hit_progress.py --hit_ids_file=tmp/hit_ids.txt
```

#### Get HIT results
You can fetch the results of your completed HITs by running "get_results.sh", which contains the following command:
```
python get_results.py \
  --hit_ids_file=tmp/hit_ids.txt \
  > tmp/results.txt
```
The results of all completed HITs are now stored as in the file `tmp/results.txt`.
Each line of the file contains a JSON blob with the results from a single assignment.

If you collect your results before all your hits have been completed and need to call get results again, you can optimize the function by passing in the results you have already collected using the following command:
```
python get_results.py \
  --hit_ids_file=tmp/hit_ids.txt \
  --output_file=tmp/results.txt \
  > tmp/results.txt
```

#### Approve work
If you are satisfied with the results that you have gotten, you can approve all completed assignments from your HIT batch by running "approve_hits.sh", which contains the following command:
```
python approve_hits.py --hit_ids_file=tmp/hit_ids.txt
```

Or if you want to approve individual assignments, you can save all the assignments id in a file ```assignment_ids.txt``` and then call "approve_assignments.sh"
```
python approve_assignments.py --assignment_ids_file=tmp/assignment_ids.txt
```

#### Delete HITs
Once your HITs are completed and you have saved the results, you can delete the HITs from Amazon's database with "disable_hits.sh":
```
python disable_hits.py --hit_ids_file=tmp/hit_ids.txt
```

#### Get All HITs
In the event that you want to get the results for all the hits that you have launched on mtc, regardless of what their hit ids are, you can call the following function. It will save a json array where every element is a hit result.
```
python get_all_hits.py \
  > tmp/all_results.txt
```

#### Rejecting Work
If you are unhappy with the work done and want to reject the work, you can call the following command (please note that rejecting work harms worker's rating on the site and can influence their ability to find other work):
```
python reject_hits.py --hit_ids_file=tmp/hit_ids.txt
```

Or you can also reject individual assignments:
```
python reject_assignments.py --assignment_ids_file=tmp/assignment_ids.txt
```

You can also disable individual hit ids from the command line:
```
python disable_hit.py --hit_id THE_HIT_ID_YOU_WANT_TO_DISABLE
```

#### Running production version
To run the HIT on the production AMT site, simply append a `--prod` flag to each of the python calls in each sh script.

## References
[0] Story Cloze Evaluation Test http://research.microsoft.com/en-us/um/people/pkohli/papers/cloze_test_naacl2016.pdf <br />
[1] Rocstories Corpus http://cs.rochester.edu/nlp/rocstories/
