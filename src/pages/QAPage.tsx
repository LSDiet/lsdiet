import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { FooterSimple } from "@/components/FooterSimple";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    title: "Obesity is Making You Sick",
    hasBookCta: true,
    questions: [
      {
        question: "Does obesity cause type 2 diabetes?",
        answer:
          "Excess body fat, especially visceral adipose tissue around the abdomen, releases pro-inflammatory cytokines (including TNF-α and IL-6) that impair insulin signalling, causing insulin resistance. Over time, the pancreas cannot produce enough insulin to compensate, leading to chronically elevated blood glucose. Uncontrolled type 2 diabetes can result in serious complications: diabetic retinopathy (vision loss), diabetic nephropathy (kidney failure requiring dialysis), peripheral neuropathy (nerve damage causing numbness and pain), and significantly increased risk of heart attack and stroke. Losing weight reduces visceral fat and inflammatory markers, restoring insulin sensitivity and lowering blood glucose levels.",
        condition: "type 2 diabetes",
      },
      {
        question: "Does obesity cause high blood pressure?",
        answer:
          "Obesity increases the workload on the heart by requiring more blood to supply additional adipose tissue. Excess fat also activates the renin-angiotensin-aldosterone system (RAAS), promoting sodium retention and vasoconstriction. Elevated leptin levels from fat tissue further stimulate the sympathetic nervous system, raising heart rate and blood pressure. Chronic hypertension damages blood vessel walls and can lead to left ventricular hypertrophy (thickened heart muscle), heart failure, stroke, kidney damage, and vision impairment. Losing weight reduces blood volume demands, calms the sympathetic nervous system, and often lowers blood pressure by 5–20 mmHg.",
        condition: "high blood pressure",
      },
      {
        question: "Does obesity cause heart disease?",
        answer:
          "Obesity contributes to atherosclerosis—the buildup of fatty plaques (composed of cholesterol, inflammatory cells, and fibrous tissue) inside coronary arteries. Pro-inflammatory adipokines (such as leptin) and cytokines (including IL-6 and CRP—C-reactive protein) accelerate this plaque formation. Additionally, obesity promotes dyslipidemia: elevated LDL cholesterol and triglycerides with reduced protective HDL cholesterol. When plaques rupture, they trigger blood clots that can cause myocardial infarction (heart attack) or sudden cardiac death. Weight loss reduces inflammatory markers (studies show CRP levels drop significantly), improves lipid profiles, and slows or reverses plaque progression.",
        condition: "heart disease",
      },
      {
        question: "Does obesity cause stroke?",
        answer:
          "Obesity elevates stroke risk through multiple pathways: hypertension damages cerebral blood vessels, atherosclerosis narrows carotid arteries supplying the brain, and a pro-thrombotic state (elevated fibrinogen, plasminogen activator inhibitor-1) increases blood clot formation. These factors can cause ischaemic stroke (blocked blood flow) or haemorrhagic stroke (vessel rupture). Stroke consequences include paralysis, speech impairment (aphasia), cognitive decline, difficulty swallowing, and permanent disability—with stroke being a leading cause of long-term disability worldwide. Reducing weight lowers blood pressure, improves arterial health, and decreases clotting risk, substantially lowering stroke likelihood.",
        condition: "stroke",
      },
      {
        question: "Does obesity cause insulin resistance?",
        answer:
          "Excess adipose tissue, particularly visceral fat, releases inflammatory cytokines (TNF-α, IL-6, MCP-1) and free fatty acids that interfere with insulin receptor signalling in muscle, liver, and fat cells. This metabolic dysfunction means cells require more insulin to absorb glucose—a state called insulin resistance. Consequences include chronically elevated insulin (hyperinsulinaemia), which promotes further fat storage, prevents fat burning, drives constant hunger, and eventually exhausts pancreatic beta cells, progressing to type 2 diabetes. Weight reduction decreases inflammatory mediators and free fatty acids, restoring normal insulin signalling and sensitivity.",
        condition: "insulin resistance",
      },
      {
        question: "Does obesity cause chronic inflammation?",
        answer:
          "Enlarged fat cells (adipocytes) and infiltrating macrophages produce a sustained release of pro-inflammatory cytokines: tumour necrosis factor-alpha (TNF-α), interleukin-6 (IL-6), interleukin-1 beta (IL-1β), and monocyte chemoattractant protein-1 (MCP-1). This creates systemic low-grade inflammation measurable by elevated C-reactive protein (CRP) in blood tests. Chronic inflammation contributes to insulin resistance, accelerated atherosclerosis, joint degradation, increased cancer risk, and even neuroinflammation affecting mood and cognition. Losing weight reduces adipocyte size and macrophage infiltration, lowering inflammatory cytokine production and CRP levels.",
        condition: "chronic inflammation",
      },
      {
        question: "Does obesity cause metabolic syndrome?",
        answer:
          "Metabolic syndrome is diagnosed when three or more of these conditions are present: central obesity (waist circumference >40 inches in men, >35 inches in women), elevated triglycerides (≥150 mg/dL), low HDL cholesterol (<40 mg/dL men, <50 mg/dL women), elevated blood pressure (≥130/85 mmHg), and elevated fasting glucose (≥100 mg/dL). Obesity drives all five components through insulin resistance, inflammation, and hormonal dysregulation. Having metabolic syndrome doubles heart disease risk and increases type 2 diabetes risk fivefold. Weight loss improves all components simultaneously—often normalising blood pressure, lipids, and glucose with just 5–10% body weight reduction.",
        condition: "metabolic syndrome",
      },
      {
        question: "Does obesity cause high cholesterol?",
        answer:
          "Obesity causes dyslipidemia—a dangerous lipid pattern characterised by elevated triglycerides, increased small dense LDL particles (the most atherogenic form), and reduced HDL cholesterol. Insulin resistance impairs the liver's ability to clear triglyceride-rich lipoproteins and reduces production of protective HDL. This lipid profile accelerates atherosclerotic plaque formation throughout the body, increasing risk of heart attack, stroke, and peripheral artery disease (reduced blood flow to limbs, potentially requiring amputation). Weight loss improves hepatic lipid metabolism, raises HDL, lowers triglycerides, and shifts LDL particles to a less harmful large-buoyant form.",
        condition: "high cholesterol",
      },
      {
        question: "Does obesity cause hormonal imbalance?",
        answer:
          "Adipose tissue is an active endocrine organ that produces hormones affecting metabolism and reproduction. Obesity elevates leptin (causing leptin resistance and persistent hunger), reduces adiponectin (an anti-inflammatory, insulin-sensitising hormone), and increases aromatase activity—converting androgens to oestrogens. In women, this hormonal disruption can cause polycystic ovary syndrome (PCOS), irregular menstrual cycles, and infertility. In men, elevated oestrogen and reduced testosterone can cause hypogonadism, reduced libido, and gynaecomastia (breast tissue development). Weight loss restores hormonal balance: leptin sensitivity improves, adiponectin rises, and sex hormone levels normalise.",
        condition: "hormonal imbalance",
      },
      {
        question: "Does obesity slow down fat burning?",
        answer:
          "Chronic hyperinsulinaemia from obesity blocks lipolysis (the release of stored fat) and inhibits fat oxidation (burning fat for energy). The enzyme hormone-sensitive lipase, which breaks down stored triglycerides, is suppressed by insulin. Additionally, inflammatory cytokines (TNF-α, IL-6) impair mitochondrial function, reducing the cell's capacity to burn fat efficiently—a state called metabolic inflexibility. The consequence is an inability to access stored energy despite excess body fat, driving persistent hunger and fatigue. Weight loss through reduced starch and sugar intake lowers insulin, reactivates lipolysis, and restores metabolic flexibility.",
        condition: "impaired fat metabolism",
      },
      {
        question: "Does obesity cause fatty liver disease?",
        answer:
          "Excess calories and insulin resistance cause triglycerides to accumulate in liver cells (hepatocytes), initially as non-alcoholic fatty liver disease (NAFLD). This can progress to non-alcoholic steatohepatitis (NASH), where inflammation and cell death occur, then to liver fibrosis (scarring), cirrhosis (permanent structural damage), and ultimately hepatocellular carcinoma (liver cancer). NAFLD affects approximately 25% of the global population, with obesity being the primary driver. Consequences include liver failure requiring transplantation. Weight loss of just 7–10% of body weight reduces liver fat content significantly and can reverse early-stage NAFLD and NASH.",
        condition: "fatty liver disease",
      },
      {
        question: "Does obesity cause gallbladder problems?",
        answer:
          "Obesity increases hepatic cholesterol secretion into bile, causing bile to become supersaturated with cholesterol. This promotes formation of cholesterol gallstones (cholelithiasis)—crystallised deposits that can block the bile duct. Blocked bile flow causes biliary colic (severe abdominal pain), acute cholecystitis (gallbladder inflammation), and potentially life-threatening complications like pancreatitis or gallbladder rupture. Obesity also reduces gallbladder motility, allowing stones to form more easily. Gradual weight loss reduces cholesterol saturation in bile and improves gallbladder function, though rapid weight loss can temporarily increase stone risk.",
        condition: "gallbladder disease",
      },
      {
        question: "Does obesity cause sleep apnoea?",
        answer:
          "Fat deposits in the pharyngeal area (neck and throat) narrow the upper airway, while abdominal obesity compresses the diaphragm and reduces lung capacity. During sleep, relaxed throat muscles allow the narrowed airway to collapse completely—causing obstructive sleep apnoea (OSA). Each apnoea episode stops breathing for 10–30 seconds, causing oxygen desaturation and micro-arousals that fragment sleep. Consequences include severe daytime fatigue, impaired concentration, increased accident risk, hypertension, heart arrhythmias (atrial fibrillation), and elevated cardiovascular mortality. Weight loss often dramatically improves or resolves OSA—studies show a 10% weight reduction can decrease apnoea severity by 50% or more.",
        condition: "sleep apnoea",
      },
      {
        question: "Does obesity reduce lung function?",
        answer:
          "Excess adipose tissue around the chest wall and abdomen mechanically restricts thoracic expansion and diaphragm movement, reducing functional residual capacity and tidal volume. This restrictive pattern impairs gas exchange and oxygen delivery. Obesity also increases airway resistance and can exacerbate asthma symptoms through inflammatory pathways. Consequences include exertional dyspnoea (breathlessness during activity), reduced exercise tolerance, hypoventilation syndrome (inadequate breathing leading to elevated CO2), and respiratory failure in severe cases. Weight loss reduces mechanical restriction, improves lung expansion, and often normalises respiratory function.",
        condition: "reduced lung function",
      },
      {
        question: "Does obesity cause osteoarthritis?",
        answer:
          "Every pound of body weight exerts approximately four pounds of pressure on knee joints during walking. Excess weight accelerates cartilage breakdown through mechanical overload. Additionally, obesity-related inflammation (elevated IL-6, TNF-α, and leptin) directly degrades cartilage through enzymatic pathways and impairs cartilage repair. Osteoarthritis consequences include chronic joint pain, stiffness, reduced mobility, and eventual need for joint replacement surgery (over 600,000 knee replacements annually in the US alone). Weight loss reduces joint loading and inflammatory cytokines—losing just 10% of body weight can reduce knee pain by 50% and slow disease progression.",
        condition: "osteoarthritis",
      },
      {
        question: "Does obesity cause back pain?",
        answer:
          "Excess abdominal weight shifts the body's centre of gravity forward, increasing lumbar lordosis (inward curvature of the lower spine) and placing abnormal stress on spinal discs, facet joints, and paraspinal muscles. This mechanical overload accelerates disc degeneration, herniation, and facet joint arthritis. Obesity-related inflammation also sensitises pain pathways and impairs disc healing. Consequences include chronic low back pain, sciatica (radiating leg pain from nerve compression), reduced mobility, and disability affecting work and daily activities. Weight reduction decreases spinal loading, reduces inflammation, and often significantly improves or resolves back pain.",
        condition: "chronic back pain",
      },
      {
        question: "Does obesity cause gallstones?",
        answer:
          "Obesity causes the liver to oversecrete cholesterol into bile while reducing bile acid and phospholipid production, creating bile that is supersaturated with cholesterol. This imbalance promotes cholesterol crystal nucleation and gallstone formation. Reduced gallbladder emptying (hypomotility) in obesity allows crystals to aggregate into stones. Gallstone complications include biliary colic (intense pain lasting hours), acute cholecystitis requiring emergency surgery, choledocholithiasis (stones blocking the common bile duct), cholangitis (bile duct infection), and acute pancreatitis. Sustained weight loss normalises bile composition and reduces stone formation risk.",
        condition: "gallstones",
      },
      {
        question: "Does obesity cause kidney disease?",
        answer:
          "Obesity causes glomerular hyperfiltration—the kidneys work harder to filter blood, which damages delicate filtration structures (glomeruli) over time. Additionally, obesity's comorbidities—hypertension, type 2 diabetes, and dyslipidemia—are the leading causes of chronic kidney disease (CKD). Elevated inflammatory cytokines and adipokines (especially leptin) directly promote renal fibrosis. CKD progression leads to declining kidney function (measured by eGFR), proteinuria, fluid retention, electrolyte imbalances, and eventually end-stage renal disease requiring dialysis or transplantation. Weight loss reduces hyperfiltration pressure, improves blood pressure and glucose control, and slows CKD progression.",
        condition: "kidney disease",
      },
      {
        question: "Does obesity cause pregnancy complications?",
        answer:
          "Maternal obesity increases risk of gestational diabetes mellitus (GDM), pre-eclampsia (dangerously high blood pressure), and gestational hypertension through insulin resistance and vascular dysfunction. These complications can cause preterm birth, macrosomia (abnormally large baby), birth injuries, emergency caesarean delivery, and postpartum haemorrhage. For the baby, risks include congenital abnormalities (neural tube defects), stillbirth, neonatal hypoglycaemia, and increased childhood obesity risk. Long-term maternal consequences include progression to type 2 diabetes and cardiovascular disease. Achieving healthy weight before pregnancy significantly reduces these risks and improves outcomes for both mother and child.",
        condition: "pregnancy complications",
      },
      {
        question: "Does obesity cause cancer?",
        answer:
          "Obesity is linked to at least 13 cancer types: endometrial, oesophageal (adenocarcinoma), kidney, pancreatic, liver, gallbladder, colorectal, thyroid, postmenopausal breast, ovarian, gastric (cardia), multiple myeloma, and meningioma. Mechanisms include hyperinsulinaemia and elevated IGF-1 (insulin-like growth factor 1) stimulating cell proliferation; increased oestrogen from aromatase activity in adipose tissue promoting hormone-sensitive cancers; chronic inflammation (TNF-α, IL-6) creating a pro-tumour microenvironment; and hypoadiponectinaemia removing cancer-protective effects. Obesity may account for 13% of cancers in women and 12% in men. Weight loss reduces circulating insulin, IGF-1, oestrogens, and inflammatory markers, lowering cancer risk.",
        condition: "cancer",
      },
      {
        question: "Does obesity cause anxiety and depression?",
        answer:
          "Obesity affects mental health through multiple pathways: chronic low-grade inflammation (elevated IL-6, TNF-α, CRP) crosses the blood-brain barrier and disrupts neurotransmitter function, particularly serotonin and dopamine systems. Weight stigma and discrimination cause chronic psychological stress. Hormonal dysregulation (leptin resistance, cortisol elevation) affects mood regulation. Consequences include clinical depression, generalised anxiety disorder, social isolation, reduced quality of life, and in severe cases, suicidal ideation. The relationship is bidirectional—depression can promote weight gain through emotional eating and inactivity. Weight loss improves inflammatory markers, restores hormonal balance, and is associated with significant improvements in mood and self-esteem.",
        condition: "anxiety and depression",
      },
      {
        question: "Does obesity reduce quality of life?",
        answer:
          "Obesity reduces quality of life across multiple domains: physical functioning (limited mobility, joint pain, breathlessness), bodily pain (chronic musculoskeletal pain), general health perception, vitality (fatigue, low energy), social functioning (isolation, stigma), and mental health (depression, anxiety). Activities of daily living become challenging—climbing stairs, walking distances, personal hygiene, and occupational tasks. Studies using validated quality-of-life instruments (SF-36, EQ-5D) consistently show obesity significantly impairs scores. Weight loss improves all domains—physical function, energy levels, pain reduction, social engagement, and psychological wellbeing—often dramatically enhancing life satisfaction.",
        condition: "lower quality of life",
      },
      {
        question: "Does obesity cause multiple chronic diseases?",
        answer:
          "Obesity is a root cause of multimorbidity—the presence of two or more chronic conditions. Through shared mechanisms of insulin resistance, chronic inflammation, and hormonal dysregulation, obesity simultaneously promotes type 2 diabetes, cardiovascular disease (hypertension, coronary artery disease), dyslipidemia, NAFLD, sleep apnoea, osteoarthritis, depression, and certain cancers. Managing multiple conditions requires numerous medications (polypharmacy), frequent medical appointments, and complex care coordination. Multimorbidity accelerates functional decline and dramatically increases healthcare costs. Weight loss addresses the common underlying pathophysiology, often improving multiple conditions simultaneously and reducing medication requirements.",
        condition: "multiple chronic diseases",
      },
      {
        question: "Does obesity cause early disease onset?",
        answer:
          "Obesity accelerates biological ageing and disease timelines. Children and adolescents with obesity now develop type 2 diabetes, hypertension, and fatty liver disease—conditions previously seen only in adults. Adults with obesity develop cardiovascular disease, metabolic syndrome, and certain cancers 10–20 years earlier than normal-weight individuals. This premature disease development is driven by prolonged exposure to hyperinsulinaemia, chronic inflammation (persistently elevated TNF-α, IL-6, CRP), and oxidative stress damaging cellular structures. Consequences include shortened disease-free years and earlier disability. Weight loss at any age slows these processes and can delay or prevent disease onset.",
        condition: "early disease onset",
      },
      {
        question: "Does obesity shorten your lifespan?",
        answer:
          "Severe obesity (BMI ≥40) reduces life expectancy by 8–14 years compared to normal weight. Even moderate obesity shortens lifespan through increased mortality from cardiovascular disease (heart attack, stroke, heart failure), type 2 diabetes complications, obesity-related cancers, respiratory failure, and kidney disease. Each 5-point increase in BMI above 25 increases mortality risk by approximately 30%. Obesity also increases surgical complications and reduces recovery from critical illness. Intentional weight loss, even modest amounts (5–10% of body weight), reduces all-cause mortality risk and extends healthy life years.",
        condition: "reduced life expectancy",
      },
      {
        question: "Does obesity cause fatigue?",
        answer:
          "Obesity causes fatigue through multiple mechanisms: insulin resistance prevents efficient cellular glucose uptake, leaving cells energy-starved despite high blood sugar; chronic inflammation (elevated TNF-α, IL-6) interferes with mitochondrial energy production; sleep apnoea fragments sleep and reduces restorative rest; depression commonly co-occurs with obesity and manifests as fatigue; and deconditioning from reduced physical activity worsens exercise intolerance. The consequence is persistent exhaustion affecting work productivity, relationships, and life enjoyment. Weight loss restores insulin sensitivity, reduces inflammation, improves sleep quality, elevates mood, and typically produces noticeable energy improvements within weeks.",
        condition: "fatigue",
      },
      {
        question: "Does obesity limit daily physical function?",
        answer:
          "Excess weight creates mechanical limitations: joint pain from osteoarthritis, breathlessness from restricted lung capacity, reduced balance from altered centre of gravity, and muscle weakness from relative sarcopenia (low muscle mass relative to fat mass). Activities like climbing stairs, rising from chairs, walking distances, bending to tie shoes, and personal grooming become difficult or impossible. Functional decline often leads to disability, loss of independence, and need for assisted living. Weight loss combined with progressive physical activity reduces joint stress, improves cardiovascular fitness, builds functional strength, and restores independence in daily activities.",
        condition: "reduced physical function",
      },
      {
        question: "Why are ultra-processed foods so hard to resist?",
        answer:
          "Ultra-processed foods (UPFs) are engineered with refined starches, added sugars, unhealthy fats, and flavour enhancers that maximise palatability and consumption. They trigger rapid glucose spikes and insulin surges, promoting fat storage and hunger cycles. UPFs also disrupt gut microbiome composition, increasing inflammation and metabolic dysfunction. Studies link high UPF consumption to obesity, metabolic syndrome, cardiovascular disease, and certain cancers independent of calorie intake. The obesogenic environment—where UPFs are cheap, convenient, and heavily marketed—makes weight management extremely difficult. A low-starch, low-sugar approach reduces insulin response and breaks the cycle of cravings driven by processed food consumption.",
        condition: "ultra-processed food cravings",
      },
    ],
  },
  {
    title: "Weight Regain",
    questions: [
      {
        question: "Why do I lose weight but always gain it back?",
        answer:
          "Most people lose weight by forcing short-term behaviours without building a system that holds when life and hunger return. Sustainable weight management requires a framework that adapts to changing circumstances, not just temporary restriction.",
      },
      {
        question: "Why does weight loss feel so hard even when I eat less?",
        answer:
          "Weight loss feels hard because hunger is biologically driven and intensified by modern ultra-processed food environments—not simply due to poor discipline. When your body perceives restriction, it amplifies hunger signals to protect against perceived starvation.",
      },
      {
        question: "Why does traditional dieting rely on hunger to work?",
        answer:
          "Traditional dieting works by forcing caloric restriction instead of restoring access to stored fat, which keeps hunger elevated throughout the process. A low-starch, low-sugar approach lowers insulin, allowing your body to use fat for fuel and naturally reducing appetite.",
      },
      {
        question: "Why does willpower stop working for weight loss?",
        answer:
          "Willpower fails because it is a finite resource that collapses under stress, hunger, and environmental pressure. The Weight Permanence Triangle™ aligns your goals with internal motivation so you don't rely on mental power alone.",
      },
      {
        question: "Why does weight loss fail when life gets busy?",
        answer:
          "When life gets busy, you revert to default habits because they're familiar and require no effort. Without a system designed for real-life conditions, temporary diets collapse under pressure. Building sustainable behaviours during the Practice stage ensures your approach survives disruption.",
      },
      {
        question: "Why do most diets stop working over time?",
        answer:
          "Most diets address food rules and biology but ignore social and environmental factors. The five Awareness stages in the book guide you through all of these. Monthly subscribers gain access to the Awareness Compass™—a proprietary conversational platform that identifies the gap between where you are and where you want to be, establishing clear internal push and pull motivation.",
      },
      {
        question: "Why does stress cause weight gain even when I eat carefully?",
        answer:
          "Stress elevates cortisol, a hormone that increases appetite (especially for high-calorie foods), promotes abdominal fat storage, and disrupts insulin sensitivity. Environmental cues—such as food availability, social eating, and comfort-seeking behaviours—compound the effect, making weight gain occur even when you believe your intake is controlled.",
      },
      {
        question: "Why does travelling make me regain weight?",
        answer:
          "Travel disrupts routine, food access, and decision structure, exposing the lack of a fallback system. The Permanence stage of the Weight Permanence Triangle™ addresses this with tools that establish an internal alert system, flagging deviations and stabilizing decisions when context, emotion, or environment changes.",
      },
      {
        question: "Why does weight loss feel like fighting hunger all day?",
        answer:
          "Weight loss feels like a fight when fat access is blocked and hunger remains the dominant signal. Oscar hates losing weight using hunger—it's unsustainable. A low-starch, low-sugar approach doesn't mean starving; it changes what your body is working against so hunger quiets down instead of screaming all day.",
      },
      {
        question: "Why do I regain weight after reaching my goal?",
        answer:
          "Weight regain happens because the system that created weight loss is often a temporary intervention rather than an adaptable lifestyle—so it's abandoned once the goal is reached. The Weight Permanence Triangle™ builds identity-level change that persists beyond any single goal.",
      },
    ],
  },
  {
    title: "Hunger & Biology",
    questions: [
      {
        question: "Is hunger biological or a lack of discipline?",
        answer:
          "Hunger is biological, not a personal failure of discipline. It is regulated primarily by hormones: ghrelin stimulates appetite, leptin signals satiety, and insulin controls blood sugar and fat storage. When these hormones are dysregulated—often by ultra-processed foods—hunger intensifies regardless of willpower. Understanding this biology is the first step toward sustainable weight management.",
      },
      {
        question: "Why does reducing sugar reduce hunger?",
        answer:
          "When you eat starch or sugar, glucose enters your bloodstream. Your pancreas responds by secreting insulin, which directs glucose into cells for energy or stores it as glycogen in the liver and muscles. Excess glucose is converted to triglycerides (fat). Chronically high insulin blocks fat mobilisation and oxidation, keeping you dependent on glucose for energy. When you reduce starch and sugar, insulin levels drop, allowing your liver to produce ketones that enable your body to burn stored fat for fuel instead of constantly demanding more sugar—naturally calming hunger.",
      },
      {
        question: "How does insulin affect fat burning and hunger?",
        answer:
          "Insulin suppresses fat mobilisation (releasing fat from storage) and oxidation (burning fat for energy). When insulin is elevated, your body cannot efficiently access stored fat, so it signals hunger to obtain energy from food instead. Lowering insulin through reduced starch and sugar intake restores fat access and reduces hunger signals.",
      },
      {
        question: "Why does eating less not always lead to weight loss?",
        answer:
          "Calories represent energy, but the composition of those calories matters enormously. One thousand calories of grilled chicken affects your hormones differently than one thousand calories of apple pie or chocolate. Eating less does not guarantee weight loss if your biology remains in fat storage mode due to elevated insulin. What you eat—and the resulting glucose and insulin response—determines whether your body stores or burns fat.",
      },
      {
        question: "Why does calorie counting fail for long-term weight loss?",
        answer:
          "Calorie counting doesn't always fail, but people often overlook the composition of those calories. Five slices of bread made from flour, water, and yeast affect your body differently than bread from multinational brands with twenty-plus ingredients, additives, and preservatives. The hormonal response to food—not just the calorie number—determines hunger, satiety, and fat storage.",
      },
      {
        question: "Can you lose weight without tracking calories?",
        answer:
          "Absolutely. The Weight Permanence Triangle™ method discusses calorie awareness, but Oscar personally does not track calories. When hunger is regulated through a low-starch, low-sugar approach, food intake naturally decreases without the need for counting or restriction. You eat until satisfied, and your body does the rest.",
      },
      {
        question: "Why does my body resist fat loss?",
        answer:
          "Your body resists fat loss when insulin remains chronically elevated, blocking access to stored fat. This is a protective biological mechanism, not a personal failing. By reducing starch and sugar intake, you lower insulin and allow your body to mobilise and burn fat naturally.",
      },
      {
        question: "What blocks fat burning even when calories are low?",
        answer:
          "Chronically elevated insulin blocks fat mobilisation and oxidation even under calorie restriction. This is why some people struggle to lose weight despite eating very little. If you experience persistent difficulty losing weight despite sustained effort, consult a medical professional to rule out underlying metabolic or hormonal conditions.",
      },
      {
        question: "Why do low-starch and low-sugar diets reduce appetite?",
        answer:
          "Low-starch, low-sugar diets reduce insulin spikes, which allows your body to access stored fat for energy. When fat is available as fuel, your brain no longer signals urgent hunger to obtain glucose. The result is stable energy throughout the day and a natural reduction in appetite—without fighting cravings or counting calories.",
      },
      {
        question: "How does food choice affect hunger more than calories?",
        answer:
          "Food choice determines your hormonal response—particularly insulin, ghrelin, and leptin—which drives hunger far more than calorie totals. A meal rich in protein and healthy fats triggers satiety hormones that keep you full for hours, while a high-starch meal of equal calories can leave you hungry again within two hours. Biology, not arithmetic, controls appetite.",
      },
    ],
  },
  {
    title: "The Low-Starch, Low-Sugar Approach",
    questions: [
      {
        question: "What does a low-starch, low-sugar lifestyle actually mean?",
        answer:
          "A low-starch, low-sugar lifestyle means prioritizing foods that minimize insulin spikes—primarily proteins, healthy fats, and non-starchy vegetables—to restore your body's access to stored fat and naturally regulate hunger. It's not about eliminating all carbohydrates, but about choosing foods that keep blood sugar stable and allow fat to be used for energy.",
      },
      {
        question: "Is low-starch, low-sugar sustainable long term?",
        answer:
          "Yes, when paired with a structure that adapts to real-life conditions. Most weight loss programmes ignore intersectionality—your culture, financial status, accessibility, and social environment. The Weight Permanence Triangle™ method teaches you when and how to be resourceful so you can navigate life's challenges without abandoning your approach.",
      },
      {
        question: "Why is low-starch, low-sugar hard in restaurants?",
        answer:
          "Restaurants are designed around starch-based foods because they are cheap to source, filling for customers, and highly profitable. Bread, pasta, rice, and potatoes form the foundation of most menus because they cost less than protein and fresh vegetables. Additionally, starchy sides bulk up portions without increasing food costs, making low-starch options harder to find and often more expensive.",
      },
      {
        question: "How do you eat low-starch, low-sugar with family meals?",
        answer:
          "This is one of the toughest challenges. Growing up in an Asian household, carbohydrates were daily staples—rice with every meal. The Weight Permanence Triangle™ method teaches you how to communicate your situation with family so they can support your decision to look after yourself. It's not easy and requires practice. Remember: practice doesn't make perfection, but permanence.",
      },
      {
        question: "Can you follow low-starch, low-sugar without a meal plan?",
        answer:
          "Yes, when food decisions are guided by structure and principles instead of rigid scripts. Oscar doesn't follow any meal plans. You can find his monthly challenges—where he eats low-starch, low-sugar in all different environments—on his YouTube channel at youtube.com/@WhatAboutWeight.",
      },
      {
        question: "Do you need to give up all carbohydrates to lose weight?",
        answer:
          "No. Weight loss depends on insulin regulation, not eliminating all carbohydrates. Complex carbohydrates from vegetables, legumes, and some whole grains provide essential fibre, vitamins, and energy for muscle function and recovery. When you lose weight, you want to burn fat—not lean muscle. Protein and some carbohydrates support muscle protein synthesis and prevent muscle breakdown, especially during physical activity. The goal is reducing refined starches and sugars that spike insulin, not eliminating every carbohydrate.",
      },
      {
        question: "How do culture and food traditions affect weight loss?",
        answer:
          "Culture shapes your default food choices, social eating patterns, and emotional connections to food. Any sustainable approach must account for these realities rather than ignore them. The Weight Permanence Triangle™ method teaches you how to integrate cultural traditions with low-starch, low-sugar principles—so you can honour your heritage while supporting your health goals.",
      },
      {
        question: "Why is eating low-starch, low-sugar more expensive?",
        answer:
          "Protein and fresh foods are less subsidized by governments and more perishable than refined carbohydrates, which drives up their cost. Processed grains have long shelf lives and lower transportation costs, making them cheaper at the supermarket. Check out Oscar's YouTube channel (youtube.com/@WhatAboutWeight) to watch how he cooks at home to overcome the cost hurdle while eating well.",
      },
      {
        question: "How do you eat low-starch, low-sugar while travelling?",
        answer:
          "You rely on principles and fallback rules rather than ideal food options. Perfect choices are rarely available when travelling, but good-enough choices usually are. The Permanence stage of the Weight Permanence Triangle™ method addresses this with tools that stabilize decisions when your environment, context, or routine changes.",
      },
      {
        question: "Is low-starch, low-sugar a diet or a lifestyle?",
        answer:
          "It becomes a lifestyle when it's integrated into your identity rather than treated as a temporary phase. A diet is something you go on and off. A lifestyle is who you are—how you naturally make food decisions without constant deliberation. The Weight Permanence Triangle™ method is designed to build that identity-level change.",
      },
    ],
  },
  {
    title: "The Weight Permanence Triangle™ Method",
    questions: [
      {
        question: "What is the Weight Permanence Triangle™?",
        answer:
          "Founded by Oscar Poon, the Weight Permanence Triangle™ is an actionable framework built around Awareness, Practice, and Permanence that helps people lose weight and keep it off by working with biology, behaviour, and real-life constraints.",
      },
      {
        question: "How does the Weight Permanence Triangle™ work?",
        answer:
          "The Weight Permanence Triangle™ works by making weight loss an internal priority through emotionally encoded awareness to create push and pull motivation, translating that priority into daily action through practice, and protecting it with systems that hold during disruption.",
      },
      {
        question: "What are the three components of the Weight Permanence Triangle™?",
        answer:
          "The three components of the Weight Permanence Triangle™ are Awareness, which creates internal priority; Practice, which structures daily behaviour; and Permanence, an alert system that ensures consistency and compensatory effort when life gets hard.",
      },
      {
        question: "Is the Weight Permanence Triangle™ a diet meal plan?",
        answer:
          "Absolutely not. Every body is different, so the calories your body requires based on your functional goals are exclusive to you—and the food you need to eat accordingly is unique to you as well. However, you will receive directional guidance to build your own meal plan. In Phase 2, Oscar will launch a platform to connect you with local dietitians, nutrition scientists, and gym trainers in Canada and the U.S.",
      },
      {
        question: "How does the Weight Permanence Triangle™ help with long-term weight loss?",
        answer:
          "The Weight Permanence Triangle™ supports long-term weight loss by preventing abandonment after success and providing structure when motivation and routine disappear.",
      },
      {
        question: "Why does the Weight Permanence Triangle™ focus on awareness instead of motivation?",
        answer:
          "The Weight Permanence Triangle™ embeds motivation directly within the Awareness stages, where the final stages emotionally encode push and pull motivation. Tools in the Permanence axis help reassess and realign that motivation as biological, social, and environmental conditions change.",
      },
      {
        question: "What are the five stages of Awareness in the Weight Permanence Triangle™?",
        answer:
          "The five stages of Awareness are: Reality Awareness (understanding your current state), Friction Awareness (identifying obstacles), Pattern Awareness (recognising recurring behaviours), Consequence Awareness (connecting actions to outcomes), and Autonomy Awareness (taking ownership of your choices).",
      },
      {
        question: "How does emotional encoding affect weight loss?",
        answer:
          "In the Weight Permanence Triangle™, emotional encoding within the Awareness stages creates push and pull motivation that anchors behaviour. In plain English, people are most likely to act and change when they want something badly enough or absolutely hate something that needs to stop immediately. The last two stages of Awareness help you connect facts with emotions and turn them into lasting motivation.",
      },
      {
        question: "How does the Weight Permanence Triangle™ handle hunger differently from diets?",
        answer:
          "Oscar hates using hunger as a weight loss tool. The Weight Permanence Triangle™ Method reduces the biological drivers of hunger instead of forcing caloric deficiency, and explicitly encourages eating until you are full rather than relying on discomfort to lose weight.",
      },
      {
        question: "How does the Weight Permanence Triangle™ help during travel and social eating?",
        answer:
          "The Weight Permanence Triangle™ helps during travel and social eating by providing flexible decision frameworks that maintain direction without requiring perfect conditions. The Permanence tools stabilise decisions when your environment, context, or routine changes.",
      },
    ],
  },
  {
    title: "The Book",
    questions: [
      {
        question: "Is Weight Permanence a diet book?",
        answer:
          "No. Weight Permanence is not a diet book because it does not prescribe rigid food rules, meal plans, or temporary restrictions. Instead, it teaches a system for making food and lifestyle decisions that hold under real-life conditions, so weight loss becomes sustainable rather than something that collapses once a diet ends.",
      },
      {
        question: "Who is the Weight Permanence book for?",
        answer:
          "While the Weight Permanence method applies to anyone who wants to lose weight, readers aged 35 and up often resonate most because of metabolic changes, accumulated life stress, and repeated experiences of weight regain that make willpower-based approaches less effective.",
      },
      {
        question: "Does Weight Permanence require tracking?",
        answer:
          "Yes, but minimally. Oscar tracks body weight once per week and uses DEXA scans every three to six months to assess body composition, focusing on long-term trends rather than daily fluctuations or obsessive tracking.",
      },
      {
        question: "Can Weight Permanence work without meal plans?",
        answer:
          "Absolutely. Weight Permanence is designed to work without meal plans by teaching decision frameworks that allow you to choose foods confidently in any environment, including restaurants, travel, and family gatherings.",
      },
      {
        question: "How is Weight Permanence different from keto or carnivore?",
        answer:
          "Weight Permanence differs from keto and carnivore by focusing on low-starch, low-sugar rather than eliminating entire food groups. Keto restricts total carbohydrates to under 20–50 grams daily to maintain ketosis, excluding most fruits, legumes, and grains. Carnivore eliminates all plant foods entirely, relying exclusively on animal products. Weight Permanence allows non-starchy vegetables, legumes, some fruits, and complex carbohydrates in moderation—acknowledging that muscle building, performance, and long-term metabolic health often require some carbohydrates. Biologically, this approach reduces insulin spikes while preserving flexibility and nutritional variety, making it more sustainable for most people.",
      },
      {
        question: "Is Weight Permanence suitable for busy professionals?",
        answer:
          "Yes. Weight Permanence was specifically designed for busy professionals. Oscar developed the method, wrote the book, and recorded all low-starch, low-sugar educational videos while working full time as a surgical market data consultant, ensuring the system works under real workload and time constraints.",
      },
      {
        question: "Can Weight Permanence work with family and social life?",
        answer:
          "Yes. Weight Permanence accounts for cultural traditions, shared meals, and social settings by prioritising structure over perfection, allowing you to maintain direction without isolating yourself or abandoning relationships.",
      },
      {
        question: "Does Weight Permanence require intense exercise?",
        answer:
          "No. Weight Permanence recognises that every body is different, and functional goals, calorie needs, and physical capacity are unique to each individual. The method provides directional guidance to help you design your own movement and nutrition approach. Future Phase 2 tools will connect users with local dietitians, nutrition scientists, and trainers in Canada and the United States for personalised support.",
      },
      {
        question: "How long does it take to see results with Weight Permanence?",
        answer:
          "Most people experience a weight reduction of five to ten pounds per month during the first three months, after which adjustments to food intake and calorie output may be needed if a plateau occurs.",
      },
      {
        question: "Is Weight Permanence about restriction or structure?",
        answer:
          "Weight Permanence is about structure, not restriction. It focuses on building systems that regulate hunger, guide decisions, and maintain progress without relying on constant control or deprivation.",
      },
    ],
  },
];

export default function QAPage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.1);

  useEffect(() => {
    document.title = "Weight Loss Q&A - Why Can't I Keep Weight Off? | Weight Permanence";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Get answers to common weight loss questions. Learn why diets fail, why you're always hungry, and how a low-starch, low-sugar approach can help you lose weight permanently."
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section ref={heroRef} className="py-10 bg-secondary/30">
          <div className="container max-w-3xl mx-auto px-4">
            <div
              className={`text-center transition-all duration-700 ${
                heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="inline-block px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full mb-4">
                Frequently Asked Questions
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                Questions About Weight Loss?
              </h1>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-5">
          <div className="container max-w-3xl mx-auto px-4">
            <div className="space-y-8">
              {faqCategories.map((category, categoryIndex) => (
                <FAQCategory
                  key={category.title}
                  category={category}
                  delay={categoryIndex * 100}
                />
              ))}
            </div>
          </div>
        </section>

        {/* References Section */}
        <section className="py-10 border-t border-border">
          <div className="container max-w-3xl mx-auto px-4">
            <h2 className="text-xl font-semibold text-primary mb-6">
              Core Government Sources on Obesity Risks
            </h2>
            <div className="space-y-6 text-sm text-muted-foreground">
              <div>
                <h3 className="font-medium text-primary mb-2">CDC – Health Consequences of Obesity</h3>
                <ul className="space-y-1">
                  <li><a href="https://www.cdc.gov/obesity/basics/consequences.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">https://www.cdc.gov/obesity/basics/consequences.html</a></li>
                  <li><a href="https://www.cdc.gov/obesity/php/about/index.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">https://www.cdc.gov/obesity/php/about/index.html</a></li>
                  <li><a href="https://www.cdc.gov/obesity/php/about/consequences.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">https://www.cdc.gov/obesity/php/about/consequences.html</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-primary mb-2">CDC – Heart Disease, Stroke, Blood Pressure</h3>
                <ul className="space-y-1">
                  <li><a href="https://www.cdc.gov/heart-disease/risk-factors/index.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">https://www.cdc.gov/heart-disease/risk-factors/index.html</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-primary mb-2">CDC – Chronic Disease & Obesity</h3>
                <ul className="space-y-1">
                  <li><a href="https://www.cdc.gov/chronic-disease/about/index.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">https://www.cdc.gov/chronic-disease/about/index.html</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-primary mb-2">NIDDK (NIH) – Health Risks of Overweight & Obesity</h3>
                <p className="text-xs text-muted-foreground/80 mb-1">One of the most comprehensive and clinically solid sources.</p>
                <ul className="space-y-1">
                  <li><a href="https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity/health-risks" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity/health-risks</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-primary mb-2">NIDDK – Diabetes, Insulin Resistance</h3>
                <ul className="space-y-1">
                  <li><a href="https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-primary mb-2">NIDDK – Fatty Liver Disease</h3>
                <ul className="space-y-1">
                  <li><a href="https://www.niddk.nih.gov/health-information/liver-disease/nafld-nash" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">https://www.niddk.nih.gov/health-information/liver-disease/nafld-nash</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-primary mb-2">NIDDK – Kidney Disease & Obesity</h3>
                <ul className="space-y-1">
                  <li><a href="https://www.niddk.nih.gov/health-information/kidney-disease" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">https://www.niddk.nih.gov/health-information/kidney-disease</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-primary mb-2">NIH / National Cancer Institute – Obesity & Cancer</h3>
                <ul className="space-y-1">
                  <li><a href="https://www.cancer.gov/about-cancer/causes-prevention/risk/obesity/obesity-fact-sheet" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">https://www.cancer.gov/about-cancer/causes-prevention/risk/obesity/obesity-fact-sheet</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-primary mb-2">CDC – Mental Health & Quality of Life</h3>
                <ul className="space-y-1">
                  <li><a href="https://www.cdc.gov/obesity/basics/consequences.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">https://www.cdc.gov/obesity/basics/consequences.html</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-primary mb-2">CDC – Mobility, Joint Health, Osteoarthritis</h3>
                <ul className="space-y-1">
                  <li><a href="https://www.cdc.gov/arthritis/basics/osteoarthritis.htm" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">https://www.cdc.gov/arthritis/basics/osteoarthritis.htm</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-primary mb-2">CDC – Sleep Apnea & Respiratory Impact</h3>
                <ul className="space-y-1">
                  <li><a href="https://www.cdc.gov/sleep/apnea.html" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline break-all">https://www.cdc.gov/sleep/apnea.html</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-secondary/30">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <p className="text-lg text-primary mb-4">
              Ready to understand the full framework?
            </p>
            <a
              href="/#book"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Learn About the Book
            </a>
          </div>
        </section>
      </main>

      <FooterSimple />
      
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqCategories.flatMap((category) =>
              category.questions.map((q) => ({
                "@type": "Question",
                name: q.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: q.answer,
                },
              }))
            ),
          }),
        }}
      />
    </div>
  );
}

function FAQCategory({
  category,
  delay,
}: {
  category: (typeof faqCategories)[0];
  delay: number;
}) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h2 className="text-xl font-semibold text-primary mb-4">{category.title}</h2>
      <Accordion type="single" collapsible className="space-y-2">
        {category.questions.map((item, index) => {
          // Bold the condition/disease in the question for the first category
          const renderQuestion = () => {
            if (category.hasBookCta && item.condition) {
              // Pattern: "Does obesity cause X?" - bold the condition
              const match = item.question.match(/^(Does obesity (?:cause|reduce|shorten|limit))\s+(.+?)(\??)$/i);
              if (match) {
                return (
                  <>
                    {match[1]} <span className="font-bold">{match[2]}</span>{match[3]}
                  </>
                );
              }
            }
            return item.question;
          };

          return (
            <AccordionItem
              key={index}
              value={`${category.title}-${index}`}
              className="border border-border rounded-lg px-4 bg-card"
            >
              <AccordionTrigger className="text-left text-primary hover:no-underline">
                {renderQuestion()}
              </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              <p>{item.answer}</p>
              {category.hasBookCta && item.condition && (
                <p className="mt-4 pt-3 border-t border-border/50">
                  <span className="text-primary font-medium">Start acting today:</span>{" "}
                  <a
                    href="/#book"
                    className="text-accent hover:underline font-medium"
                  >
                    Order Weight Permanence
                  </a>{" "}
                  to reduce your likelihood of {item.condition}.
                </p>
              )}
            </AccordionContent>
          </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
