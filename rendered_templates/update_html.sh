cp ../hit_templates/fol.js .
cp ../hit_templates/main.js .
cp ../hit_templates/instructions.html .
cd ..
python render_template.py --html_template=story_understanding.html 
