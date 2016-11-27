cp ../hit_templates/RuleManager.jsx .
cp ../hit_templates/main.js .
cp ../hit_templates/FooterInstructionComponent.jsx .
cp ../hit_templates/InstructionComponent.jsx .
cp ../hit_templates/app.jsx .
cp ../hit_templates/SubHeaderInstructionComponent.jsx .
cp ../hit_templates/index.html .
cd ..
python render_template.py --html_template=index.html
