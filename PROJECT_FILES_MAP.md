# خريطة الملفات البرمجية الشاملة لمنصة (English for Iraq - Unit 1, 2, 3)
> **تاريخ التحديث:** ٢٥ أكتوبر ٢٠٢٦  
> **إجمالي الملفات المفهرسة:** 260 ملفاً برمجياً  
> **الهدف:** دليل مرجعي كامل ودقيق يوضح مسار كل ملف في المشروع والوظيفة البرمجية والتعليمية التي يؤديها، لتسهيل التعديل والتطوير بدون أي أخطاء أو تخمين.

---

## 1. الملفات الجذرية وإعدادات المشروع (Root Configuration) (6 ملفاً)

| المسار البرمجي (File Path) | الوظيفة والدور في التطبيق (Role & Purpose) |
| :--- | :--- |
| `count_chars.ts` | سكربت مساعد لفحص وحساب حروف ونصوص المنهج. |
| `index.html` | صفحة البداية الرئيسية ونقطة تحميل التطبيق بالمتصفح ودعم اللغة العربية (RTL). |
| `metadata.json` | ملف وصفي لبيانات وتفاصيل المنصة. |
| `package.json` | ملف تعريف المشروع، الحزم والمكتبات المعتمدة (React, Vite, Firebase...) وأوامر التشغيل والبناء. |
| `tsconfig.json` | إعدادات مترجم TypeScript العامة للمشروع. |
| `vite.config.ts` | إعدادات مجمع Vite للإنتاج، دعم Tailwind CSS v4 ومسار النشر على GitHub Pages (/iqenglish/). |

---

## 2. ملفات الويب المتقدمة والخدمة (PWA & Service Worker) (2 ملفاً)

| المسار البرمجي (File Path) | الوظيفة والدور في التطبيق (Role & Purpose) |
| :--- | :--- |
| `public/manifest.json` | إعدادات تطبيق الويب التقدمي (PWA) لتثبيت المنصة كتطبيق على هواتف الطلاب. |
| `public/sw.js` | عامل الخدمة (Service Worker) للتخزين المؤقت للأصوات والصور للعمل بدون إنترنت. |

---

## 3. النواة والموجّه الرئيسي للتطبيق (Core App & Navigation) (8 ملفاً)

| المسار البرمجي (File Path) | الوظيفة والدور في التطبيق (Role & Purpose) |
| :--- | :--- |
| `src/App.tsx` | الموجّه والمكوّن الجذري للمنصة، يدير التنقل بين الدروس، القواعد، لوحة المعلم، وتسجيل الدخول. |
| `src/components/AudioTranscriptPlayer.tsx` | مشغل تفاعلي سريع للربط بين الصوت والنص المكتوب. |
| `src/components/CharacterAvatar.tsx` | أفاتار وصور شخصيات المنهج (أحمد، باسم، هدى، ريم). |
| `src/components/Header.tsx` | شريط الرأس العلوي للمنصة، يحتوي على شعار التطبيق، حالة الاشتراك، وزر تسجيل الخروج. |
| `src/components/LessonGridSelector.tsx` | شبكة اختيار وتصفح دروس الوحدة (من الدرس 1 إلى الدرس 10). |
| `src/components/UnitSelector.tsx` | شريط اختيار الوحدات الدراسية (الوحدة 1، 2، 3) والتنقل بينها. |
| `src/index.css` | ملف التنسيقات العامة وخطوط التطبيق (Cairo / Tajawal) وتأثيرات Tailwind. |
| `src/main.tsx` | نقطة الانطلاق البرمجية لـ React، يقوم بربط App.tsx بعنصر DOM الرئيسي. |

---

## 4. بوابات المصادقة وتسجيل الدخول (Auth & Gates) (6 ملفاً)

| المسار البرمجي (File Path) | الوظيفة والدور في التطبيق (Role & Purpose) |
| :--- | :--- |
| `src/components/auth/MaintenanceScreen.tsx` | شاشة وضع الصيانة عند إيقاف المنصة مؤقتاً للتحديث. |
| `src/components/auth/StudentCodeVerificationForm.tsx` | نموذج التحقق من صحة كود التفعيل وصلاحية اشتراك الطالب. |
| `src/components/auth/StudentLoginScreen.tsx` | شاشة تسجيل دخول الطالب المعتمدة، تتيح إدخال كود التفعيل أو رمز المعلم. |
| `src/components/auth/StudentProfileRegistrationForm.tsx` | نموذج تسجيل بيانات الطالب الجديدة (الاسم، المحافظة، المدرسة) عند أول تفعيل. |
| `src/components/auth/TeacherPinForm.tsx` | نموذج إدخال الرمز السري الخاص بالمعلم (PIN) للوصول للوحة التحكم. |
| `src/components/auth/constants.ts` | الثوابت والرسائل التوضيحية الخاصة بنظام الدخول والمصادقة. |

---

## 5. نظام الامتحانات والتقييم والعداد (Exam System & Timer) (7 ملفاً)

| المسار البرمجي (File Path) | الوظيفة والدور في التطبيق (Role & Purpose) |
| :--- | :--- |
| `src/components/exam/ExamQuestionsForm.tsx` | واجهة أداء الامتحان التفاعلي للطالب وعرض الأسئلة والخيارات. |
| `src/components/exam/ExamResultCard.tsx` | كارت نتيجة الامتحان الفورية للطالب مع النسبة والدرجة والتقييم. |
| `src/components/exam/ExamTimerBanners.tsx` | عداد الوقت التنازلي التفاعلي المتبقي أثناء أداء الامتحان. |
| `src/components/exam/MandatoryExamOverlay.tsx` | شاشة الامتحان الإجباري التي تظهر للطالب قبل الانتقال للمحتوى التالي. |
| `src/components/exam/StudentGradesHistoryModal.tsx` | نافذة منبثقة لعرض سجل امتحانات الطالب السابقة وتاريخها. |
| `src/components/exam/StudentGradesPage.tsx` | صفحة كشف الدرجات التفصيلي للطالب في جميع الامتحانات. |
| `src/components/exam/StudentQuickExamModal.tsx` | نافذة الامتحان السريع الذاتي للطالب. |

---

## 6. الهيكل العام والمعارض البصرية (Layout & Showcases) (7 ملفاً)

| المسار البرمجي (File Path) | الوظيفة والدور في التطبيق (Role & Purpose) |
| :--- | :--- |
| `src/components/FourSeasonsShowcase.tsx` | معرض استعراض فصول السنة الأربعة ومفردات الطقس. |
| `src/components/HolidayActivitiesShowcase.tsx` | معرض أنشطة العطلات الصيفية والرحلات التفاعلي. |
| `src/components/IraqLandmarksShowcase.tsx` | معرض معالم وآثار العراق التاريخية والسياحية. |
| `src/components/layout/AppFooter.tsx` | شريط تذييل الصفحة للمنصة مع حقوق النشر ومعلومات المنهج. |
| `src/components/layout/AppModalsAndGates.tsx` | بوابات الأمان والحماية التي تحجب المحتوى عن غير المشتركين. |
| `src/components/layout/TrialNoticeBar.tsx` | شريط التنبيه العلوي للطلاب أصحاب الاشتراكات التجريبية مع عداد الوقت المتبقي. |
| `src/components/showcases/Unit1LessonShowcase.tsx` | معرض استعراض وتصفح دروس الوحدة الأولى. |

---

## 7. مكونات القواعد النحوية وشاشاتها (Grammar Components) (19 ملفاً)

| المسار البرمجي (File Path) | الوظيفة والدور في التطبيق (Role & Purpose) |
| :--- | :--- |
| `src/components/grammar/GrammarTopicDetail.tsx` | العارض الرئيسي لتفاصيل القاعدة النحوية وشريط التنقل بين الإثبات والنفي والسؤال. |
| `src/components/grammar/GrammarTopicSelector.tsx` | قائمة اختيار وتصفح المواضيع النحوية داخل الوحدة المحددة. |
| `src/components/grammar/GrammarUnitSelector.tsx` | واجهة اختيار الوحدة النحوية (الوحدة 1، 2، 3) في قسم القواعد. |
| `src/components/grammar/topic-detail/AffirmativeTab.tsx` | تبويب حالة الإثبات: يعرض معادلة القاعدة وكروت التوضيح والأمثلة الصوتية. |
| `src/components/grammar/topic-detail/ComparativesView.tsx` | واجهة قواعد المقارنة والمفاضلة (Comparative & Superlative). |
| `src/components/grammar/topic-detail/ExamApplicationsList.tsx` | عرض نماذج الأسئلة الامتحانية مع خطوات الحل النموذجية خطوة بخطوة. |
| `src/components/grammar/topic-detail/ExamPracticeTab.tsx` | تبويب التدريب الامتحاني التفاعلي لكل قاعدة مع التصحيح الفوري والتعزيز. |
| `src/components/grammar/topic-detail/HighlightedSentence.tsx` | مكونات نظام القواعد النحوية التفاعلي. |
| `src/components/grammar/topic-detail/InterestsView.tsx` | واجهة خاصة لقواعد الاهتمامات (like/enjoy) وظروف التكرار (Adverbs of Frequency). |
| `src/components/grammar/topic-detail/JoiningSentencesView.tsx` | واجهة قواعد ربط الجمل بأدوات الربط (and, but, because, or). |
| `src/components/grammar/topic-detail/NegativeTab.tsx` | تبويب حالة النفي: معادلة النفي، التنبيهات من الأخطاء الشائعة، وقواعد دمج not. |
| `src/components/grammar/topic-detail/OrdinalDatesView.tsx` | واجهة الأعداد الترتيبية وقراءة وكتابة التواريخ وحروف الجر. |
| `src/components/grammar/topic-detail/OverviewTab.tsx` | تبويب نظرة عامة: استخدام الزمن، الدلالات الزمنية، وقواعد الإملاء وجدول أفعال الكتاب. |
| `src/components/grammar/topic-detail/PossessivePronounsView.tsx` | واجهة متخصصة لقواعد وجدول ضمائر وصفات التملك وتحويلاتها. |
| `src/components/grammar/topic-detail/QuestionTab.tsx` | تبويب الاستفهام: صيغة السؤال، التقديم والتأخير، والإجابات القصيرة (Yes/No). |
| `src/components/grammar/topic-detail/SpellingNotesTab.tsx` | تبويب الملاحظات الإملائية الوزارية لتصحيح الأفعال. |
| `src/components/grammar/topic-detail/Unit2GrammarView.tsx` | عرض قواعد الوحدة الثانية المجمعة (المستقبل، المقارنة، والتواريخ). |
| `src/components/grammar/topic-detail/Unit3GrammarView.tsx` | عرض قواعد الوحدة الثالثة التفاعلية. |
| `src/components/grammar/topic-detail/WhQuestionsView.tsx` | واجهة قواعد تكوين الأسئلة بأدوات الاستفهام (Wh- Questions). |

---

## 8. مكونات تمارين كتاب النشاط (Activity Book Exercises) (48 ملفاً)

| المسار البرمجي (File Path) | الوظيفة والدور في التطبيق (Role & Purpose) |
| :--- | :--- |
| `src/components/exercises/GenericLessonExercises.tsx` | مشغل التمارين التفاعلي العام الذي يعرض تمارين أي درس بناءً على البيانات. |
| `src/components/exercises/Lesson10Exercises.tsx` | مكونات عرض وحل تمارين كتاب النشاط التفاعلية. |
| `src/components/exercises/Lesson1Exercises.tsx` | تمارين الدرس الأول من كتاب النشاط (العطل والأنشطة). |
| `src/components/exercises/Lesson2Exercises.tsx` | مكونات عرض وحل تمارين كتاب النشاط التفاعلية. |
| `src/components/exercises/Lesson3Exercises.tsx` | مكونات عرض وحل تمارين كتاب النشاط التفاعلية. |
| `src/components/exercises/Lesson4Exercises.tsx` | مكونات عرض وحل تمارين كتاب النشاط التفاعلية. |
| `src/components/exercises/Lesson5Exercises.tsx` | مكونات عرض وحل تمارين كتاب النشاط التفاعلية. |
| `src/components/exercises/Lesson6Exercises.tsx` | مكونات عرض وحل تمارين كتاب النشاط التفاعلية. |
| `src/components/exercises/Lesson7Exercises.tsx` | مكونات عرض وحل تمارين كتاب النشاط التفاعلية. |
| `src/components/exercises/Lesson8Exercises.tsx` | مكونات عرض وحل تمارين كتاب النشاط التفاعلية. |
| `src/components/exercises/lesson10/SwiftComprehensionQuestions.tsx` | تمارين الدرس العاشر التفاعلية (وقت القصة: قصة الراعي الذكي والأسئلة). |
| `src/components/exercises/lesson10/SwiftStoryElements.tsx` | تمارين الدرس العاشر التفاعلية (وقت القصة: قصة الراعي الذكي والأسئلة). |
| `src/components/exercises/lesson10/SwiftTrueFalse.tsx` | تمارين الدرس العاشر التفاعلية (وقت القصة: قصة الراعي الذكي والأسئلة). |
| `src/components/exercises/lesson10/SwiftVocabularyMatch.tsx` | تمارين الدرس العاشر التفاعلية (وقت القصة: قصة الراعي الذكي والأسئلة). |
| `src/components/exercises/lesson2/Exercise1Descriptions.tsx` | تمارين الدرس الثاني التفاعلية (المذكرات، مقابلة سارة، وترتيب الجمل). |
| `src/components/exercises/lesson2/Exercise3WordMatches.tsx` | تمارين الدرس الثاني التفاعلية (المذكرات، مقابلة سارة، وترتيب الجمل). |
| `src/components/exercises/lesson2/Exercise4ScrambledSentences.tsx` | تمارين الدرس الثاني التفاعلية (المذكرات، مقابلة سارة، وترتيب الجمل). |
| `src/components/exercises/lesson2/Exercise5SaraInterview.tsx` | تمارين الدرس الثاني التفاعلية (المذكرات، مقابلة سارة، وترتيب الجمل). |
| `src/components/exercises/lesson2/ExerciseBPhotos.tsx` | تمارين الدرس الثاني التفاعلية (المذكرات، مقابلة سارة، وترتيب الجمل). |
| `src/components/exercises/lesson3/Exercise1VerbsTable.tsx` | تمارين الدرس الثالث (جدول تصريف الأفعال الماضية القياسية والشاذة). |
| `src/components/exercises/lesson3/Exercise4Wordsearch.tsx` | تمارين الدرس الثالث (جدول تصريف الأفعال الماضية القياسية والشاذة). |
| `src/components/exercises/lesson3/Exercise5RichardStory.tsx` | تمارين الدرس الثالث (جدول تصريف الأفعال الماضية القياسية والشاذة). |
| `src/components/exercises/lesson3/Exercise7Adjectives.tsx` | تمارين الدرس الثالث (جدول تصريف الأفعال الماضية القياسية والشاذة). |
| `src/components/exercises/lesson3/ExerciseASBQuestions.tsx` | تمارين الدرس الثالث (جدول تصريف الأفعال الماضية القياسية والشاذة). |
| `src/components/exercises/lesson3/ExerciseBActionTypes.tsx` | تمارين الدرس الثالث (جدول تصريف الأفعال الماضية القياسية والشاذة). |
| `src/components/exercises/lesson4/Exercise1Pronouns.tsx` | تمارين الدرس الرابع التفاعلية (التدريب على المفردات والجمل). |
| `src/components/exercises/lesson4/Exercise2InterestsGerunds.tsx` | تمارين الدرس الرابع التفاعلية (التدريب على المفردات والجمل). |
| `src/components/exercises/lesson4/Exercise3HobbiesReading.tsx` | تمارين الدرس الرابع التفاعلية (التدريب على المفردات والجمل). |
| `src/components/exercises/lesson4/Exercise4WritingParagraph.tsx` | تمارين الدرس الرابع التفاعلية (التدريب على المفردات والجمل). |
| `src/components/exercises/lesson4/ExerciseAScrapbookMatch.tsx` | تمارين الدرس الرابع التفاعلية (التدريب على المفردات والجمل). |
| `src/components/exercises/lesson5/Exercise1FrequencySurvey.tsx` | تمارين الدرس الخامس (رسالة كارين ومفردات البلدان). |
| `src/components/exercises/lesson5/Exercise2PartnerGame.tsx` | تمارين الدرس الخامس (رسالة كارين ومفردات البلدان). |
| `src/components/exercises/lesson5/Exercise3AdverbsSentences.tsx` | تمارين الدرس الخامس (رسالة كارين ومفردات البلدان). |
| `src/components/exercises/lesson5/Exercise4FiveSentencesWriting.tsx` | تمارين الدرس الخامس (رسالة كارين ومفردات البلدان). |
| `src/components/exercises/lesson6/Exercise1ComprehensionQuestions.tsx` | تمارين الدرس السادس (المحادثات، الصور، والأسئلة الاستيعابية). |
| `src/components/exercises/lesson6/Exercise2PartnerDialogue.tsx` | تمارين الدرس السادس (المحادثات، الصور، والأسئلة الاستيعابية). |
| `src/components/exercises/lesson6/Exercise3SoundsSort.tsx` | تمارين الدرس السادس (المحادثات، الصور، والأسئلة الاستيعابية). |
| `src/components/exercises/lesson6/ExerciseADialogueMatch.tsx` | تمارين الدرس السادس (المحادثات، الصور، والأسئلة الاستيعابية). |
| `src/components/exercises/lesson7/AhmedComprehensionQuestions.tsx` | تمارين الدرس السابع (قصة أحمد، والأسئلة والتمارين المرتبطة بها). |
| `src/components/exercises/lesson7/AhmedStoryCardReader.tsx` | تمارين الدرس السابع (قصة أحمد، والأسئلة والتمارين المرتبطة بها). |
| `src/components/exercises/lesson7/ExerciseAActivitiesMatch.tsx` | تمارين الدرس السابع (قصة أحمد، والأسئلة والتمارين المرتبطة بها). |
| `src/components/exercises/lesson7/ExerciseCTrueFalse.tsx` | تمارين الدرس السابع (قصة أحمد، والأسئلة والتمارين المرتبطة بها). |
| `src/components/exercises/lesson7/ExerciseDMakeNotes.tsx` | تمارين الدرس السابع (قصة أحمد، والأسئلة والتمارين المرتبطة بها). |
| `src/components/exercises/lesson7/ExerciseEPartnerInterview.tsx` | تمارين الدرس السابع (قصة أحمد، والأسئلة والتمارين المرتبطة بها). |
| `src/components/exercises/lesson8/KarenComprehensionQuestions.tsx` | تمارين الدرس الثامن (تمارين المراجعة الشاملة للوحدة). |
| `src/components/exercises/lesson8/KarenLetterPlanning.tsx` | تمارين الدرس الثامن (تمارين المراجعة الشاملة للوحدة). |
| `src/components/exercises/lesson8/KarenModelLetterComposition.tsx` | تمارين الدرس الثامن (تمارين المراجعة الشاملة للوحدة). |
| `src/components/exercises/lesson8/KarenQuestionsReconstruction.tsx` | تمارين الدرس الثامن (تمارين المراجعة الشاملة للوحدة). |

---

## 9. لوحة تحكم المعلم وإدارة الاشتراكات (Teacher Dashboard & Admin) (24 ملفاً)

| المسار البرمجي (File Path) | الوظيفة والدور في التطبيق (Role & Purpose) |
| :--- | :--- |
| `src/components/admin/TeacherAuthCard.tsx` | مكونات لوحة إدارة المعلم ومراقبة المنصة. |
| `src/components/admin/TeacherDashboardPage.tsx` | الصفحة الرئيسية للوحة تحكم المعلم الشاملة لإدارة المنصة. |
| `src/components/admin/curriculum/CurriculumLocksManager.tsx` | مكونات لوحة إدارة المعلم ومراقبة المنصة. |
| `src/components/admin/exam/ExamSourceCascader.tsx` | مكونات لوحة إدارة المعلم ومراقبة المنصة. |
| `src/components/admin/header/TeacherHeader.tsx` | مكونات لوحة إدارة المعلم ومراقبة المنصة. |
| `src/components/admin/modals/AbsenteeNoticeModal.tsx` | مكونات لوحة إدارة المعلم ومراقبة المنصة. |
| `src/components/admin/modals/PdfReportModal.tsx` | مكونات لوحة إدارة المعلم ومراقبة المنصة. |
| `src/components/admin/modals/StudentHistoryModal.tsx` | مكونات لوحة إدارة المعلم ومراقبة المنصة. |
| `src/components/admin/navigation/DashboardTabsNav.tsx` | مكونات لوحة إدارة المعلم ومراقبة المنصة. |
| `src/components/admin/overview/DashboardOverviewMetrics.tsx` | مكونات لوحة إدارة المعلم ومراقبة المنصة. |
| `src/components/admin/tabs/AnalyticsTab.tsx` | مكونات لوحة إدارة المعلم ومراقبة المنصة. |
| `src/components/admin/tabs/CodesTab.tsx` | مكونات لوحة إدارة المعلم ومراقبة المنصة. |
| `src/components/admin/tabs/CurriculumLocksTab.tsx` | مكونات لوحة إدارة المعلم ومراقبة المنصة. |
| `src/components/admin/tabs/ExamBuilderTab.tsx` | أداة المعلم الذكية لإنشاء وتخصيص الامتحانات التفاعلية وحفظها. |
| `src/components/admin/tabs/ExamResultsTab.tsx` | مكونات لوحة إدارة المعلم ومراقبة المنصة. |
| `src/components/admin/tabs/SubscriptionsTab.tsx` | إدارة وتوليد أكواد اشتراك الطلاب (فردية وجماعية) وتحديد مدة الصلاحية. |
| `src/components/admin/tabs/results/AbsentStudentsTable.tsx` | مكونات لوحة إدارة المعلم ومراقبة المنصة. |
| `src/components/admin/tabs/results/RegisteredStudentsTable.tsx` | مكونات لوحة إدارة المعلم ومراقبة المنصة. |
| `src/components/admin/tabs/results/ResultsStatsCards.tsx` | كروت الإحصائيات السريعة لأعداد الطلاب المشتركين ونسب الإنجاز. |
| `src/components/admin/tabs/results/SubmittedStudentsTable.tsx` | مكونات لوحة إدارة المعلم ومراقبة المنصة. |
| `src/components/admin/tabs/subscriptions/GenerateSubscriptionForm.tsx` | إدارة وتوليد أكواد اشتراك الطلاب (فردية وجماعية) وتحديد مدة الصلاحية. |
| `src/components/admin/tabs/subscriptions/SubscriptionRowItem.tsx` | إدارة وتوليد أكواد اشتراك الطلاب (فردية وجماعية) وتحديد مدة الصلاحية. |
| `src/components/admin/tabs/subscriptions/SubscriptionStatsCards.tsx` | إدارة وتوليد أكواد اشتراك الطلاب (فردية وجماعية) وتحديد مدة الصلاحية. |
| `src/components/admin/tabs/subscriptions/SubscriptionsList.tsx` | إدارة وتوليد أكواد اشتراك الطلاب (فردية وجماعية) وتحديد مدة الصلاحية. |

---

## 10. مشغلات الصوتيات والترجمة الفورية (Audio & Transcripts) (3 ملفاً)

| المسار البرمجي (File Path) | الوظيفة والدور في التطبيق (Role & Purpose) |
| :--- | :--- |
| `src/components/audio/AudioPlayerControls.tsx` | مشغل الصوت التفاعلي المتقدم مع أزرار التقديم، الإرجاع، وتكرار الاستماع. |
| `src/components/audio/TranscriptLineItem.tsx` | عنصر السطر الصوتي الفردي مع الصورة التوضيحية المتزامنة. |
| `src/components/audio/types.ts` | مكونات مشغل الصوت وعرض المقاطع الصوتية المزامنة للدروس. |

---

## 12. بيانات وقواعد النحو التفاعلية (Grammar Data) (10 ملفاً)

| المسار البرمجي (File Path) | الوظيفة والدور في التطبيق (Role & Purpose) |
| :--- | :--- |
| `src/data/grammar/unit1/index.ts` | فهرس تجميع وتصدير كافة قواعد الوحدة الأولى في مصفوفة موحدة. |
| `src/data/grammar/unit1/topic1-past-simple.ts` | بيانات وقواعد الماضي البسيط (Past Simple): إثبات، نفي، سؤال، أفعال، وأسئلة. |
| `src/data/grammar/unit1/topic2-past-continuous.ts` | بيانات وقواعد الماضي المستمر (Past Continuous): تفصيل was/were، ing، وتمارين. |
| `src/data/grammar/unit1/topic3-present-simple.ts` | بيانات وقواعد المضارع البسيط (Present Simple): s الشخص الثالث، doesn't/don't. |
| `src/data/grammar/unit1/topic4-adverbs-frequency.ts` | بيانات ظروف التكرار (Adverbs of Frequency): نسب التكرار، وموقعها بالجملة. |
| `src/data/grammar/unit1/topic5-possessive-pronouns.ts` | بيانات ضمائر وصفات التملك: جدول التحويلات السبعة، وقواعد التملك. |
| `src/data/grammar/unit1/topic6-joining-sentences.ts` | بيانات أدوات ربط الجمل (and, but, so, because, or) واستخداماتها. |
| `src/data/grammar/unit1/topic7-interests.ts` | بيانات التعبير عن الاهتمامات (like, enjoy, love, interested in). |
| `src/data/grammar/unit1/topic8-wh-questions.ts` | بيانات أدوات الاستفهام وتكوين الأسئلة (Wh- Questions). |
| `src/data/grammar/unit1/types.ts` | الأنماط والواجهات البرمجية (TypeScript Types) الخاصة بقواعد الوحدة الأولى. |

---

## 13. بيانات المنهج وكتاب الطالب والنشاط (Curriculum Data) (47 ملفاً)

| المسار البرمجي (File Path) | الوظيفة والدور في التطبيق (Role & Purpose) |
| :--- | :--- |
| `src/data/activityBookAllLessons.ts` | قالب وتمارين الدروس من 3 إلى 10 لكتاب النشاط. |
| `src/data/activityBookData.ts` | تمارين كتاب النشاط للدرسين الأول والثاني للوحدة الأولى. |
| `src/data/activityBookLesson10Data.ts` | بيانات وحلول التمارين التفصيلية لدرس محدد من كتاب النشاط. |
| `src/data/activityBookLesson3Data.ts` | بيانات وحلول التمارين التفصيلية لدرس محدد من كتاب النشاط. |
| `src/data/activityBookLesson4Data.ts` | بيانات وحلول التمارين التفصيلية لدرس محدد من كتاب النشاط. |
| `src/data/activityBookLesson5Data.ts` | بيانات وحلول التمارين التفصيلية لدرس محدد من كتاب النشاط. |
| `src/data/activityBookLesson6Data.ts` | بيانات وحلول التمارين التفصيلية لدرس محدد من كتاب النشاط. |
| `src/data/activityBookLesson7Data.ts` | بيانات وحلول التمارين التفصيلية لدرس محدد من كتاب النشاط. |
| `src/data/activityBookLesson8Data.ts` | بيانات وحلول التمارين التفصيلية لدرس محدد من كتاب النشاط. |
| `src/data/curriculumChunks.ts` | أجزاء وقطع المنهج المقسمة لدعم القراءة المتدرجة والبحث. |
| `src/data/curriculumStructure.ts` | الهيكل البنائي للمنهج: فهرس الوحدات، الدروس، ومواضيع القواعد المعتمدة. |
| `src/data/defaultExamQuestions.ts` | بنك الأسئلة الامتحانية الجاهزة الافتراضية لمنشئ الامتحانات. |
| `src/data/grammarData.ts` | ملف فهرس الوحدات النحوية، يحتوي قائمة كروت الوحدات في الشاشة الرئيسية. |
| `src/data/lessonScenes.ts` | مشاهد وصور الدروس والمحادثات المرئية. |
| `src/data/unit1Data.ts` | نصوص ومحادثات ومفردات كتاب الطالب للوحدة الأولى كاملة. |
| `src/data/unit1GrammarTopics.ts` | إعادة تصدير لقواعد الوحدة الأولى من مجلدها الفرعي. |
| `src/data/unit1ShowcaseData.ts` | معارض العرض البصري والتفاعلي لمفردات المنهج. |
| `src/data/unit2ActivityBookData.ts` | تمارين وحلول كتاب النشاط للوحدة الثانية كاملة. |
| `src/data/unit2CurriculumChunks.ts` | أجزاء وقطع المنهج المقسمة لدعم القراءة المتدرجة والبحث. |
| `src/data/unit2Data.ts` | نصوص ومحادثات ومفردات كتاب الطالب للوحدة الثانية كاملة. |
| `src/data/unit2GrammarTopics.ts` | بيانات وقواعد الوحدة الثانية المنهجية (المستقبل، المقارنة، والتواريخ). |
| `src/data/unit3/chunks/index.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/chunks/lesson10Chunks.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/chunks/lesson1Chunks.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/chunks/lesson2Chunks.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/chunks/lesson3Chunks.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/chunks/lesson4Chunks.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/chunks/lesson5Chunks.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/chunks/lesson6Chunks.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/chunks/lesson7Chunks.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/chunks/lesson8Chunks.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/chunks/lesson9Chunks.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/index.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/lesson1.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/lesson10.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/lesson2.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/lesson3.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/lesson4.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/lesson5.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/lesson6.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/lesson7.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/lesson8.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3/lesson9.ts` | بيانات المنهج الدراسي والمحتوى التعليمي. |
| `src/data/unit3ActivityBookData.ts` | تمارين وحلول كتاب النشاط للوحدة الثالثة كاملة. |
| `src/data/unit3CurriculumChunks.ts` | أجزاء وقطع المنهج المقسمة لدعم القراءة المتدرجة والبحث. |
| `src/data/unit3Data.ts` | نصوص ومحادثات ومفردات كتاب الطالب للوحدة الثالثة كاملة. |
| `src/data/unit3GrammarTopics.ts` | بيانات وقواعد الوحدة الثالثة المنهجية (المضارع التام، أدوات العطف). |

---

## 14. خدمات السيرفر وقاعدة بيانات Firebase (Cloud Services) (10 ملفاً)

| المسار البرمجي (File Path) | الوظيفة والدور في التطبيق (Role & Purpose) |
| :--- | :--- |
| `src/services/firebase.ts` | تهيئة وربط تطبيق Firebase (Firestore, Auth, Analytics) بالمفاتيح الخاصة. |
| `src/services/firebase/analyticsService.ts` | خدمات الربط السحابي مع Firebase. |
| `src/services/firebase/client.ts` | خدمات الربط السحابي مع Firebase. |
| `src/services/firebase/examService.ts` | خدمة حفظ وجلب الامتحانات المنشأة من قبل المعلم للطلاب. |
| `src/services/firebase/index.ts` | خدمات الربط السحابي مع Firebase. |
| `src/services/firebase/platformConfigService.ts` | خدمات الربط السحابي مع Firebase. |
| `src/services/firebase/studentService.ts` | خدمات الربط السحابي مع Firebase. |
| `src/services/firebase/subscriptionService.ts` | خدمة إدارة الجلسات والتحقق المستمر من صلاحية اشتراك الطالب الحالي. |
| `src/services/firebase/teacherAuthService.ts` | خدمات الربط السحابي مع Firebase. |
| `src/services/firebase/types.ts` | تعريفات TypeScript لبيانات Firebase (بيانات الطالب، الكود، الدرجة، الامتحان). |

---

## 15. القواميس والدوال المساعدة والأنماط (Utils & Types) (11 ملفاً)

| المسار البرمجي (File Path) | الوظيفة والدور في التطبيق (Role & Purpose) |
| :--- | :--- |
| `src/constants/storageKeys.ts` | ملف برمجي مساعد ضمن هيكل المنصة. |
| `src/hooks/usePlatformSession.ts` | ملف برمجي مساعد ضمن هيكل المنصة. |
| `src/modules/access-control/useAccessControl.ts` | سجلات المنهج ووحدات الربط البرمجي الداخلي. |
| `src/modules/curriculum/curriculumRegistry.ts` | سجلات المنهج ووحدات الربط البرمجي الداخلي. |
| `src/types/curriculum.ts` | التعريفات الهيكلية للأنماط البرمجية (Types) للمنهج والقواعد والمستخدمين. |
| `src/types/grammar.ts` | التعريفات الهيكلية للأنماط البرمجية (Types) للمنهج والقواعد والمستخدمين. |
| `src/utils/audioFeedback.ts` | دوال مساعدة برمجية وتنسيق النصوص والتواريخ. |
| `src/utils/characterProfiles.ts` | دوال مساعدة برمجية وتنسيق النصوص والتواريخ. |
| `src/utils/offlineMedia.ts` | دوال مساعدة برمجية وتنسيق النصوص والتواريخ. |
| `src/utils/speech.ts` | دوال مساعدة برمجية وتنسيق النصوص والتواريخ. |
| `src/utils/wordTranslations.ts` | قاموس الترجمة الفورية الذاتي للكلمات والمفردات الإنجليزية للعربية. |

---

## 16. سكربتات الأتمتة وتوليد الصوتيات (Automation & Scripts) (51 ملفاً)

| المسار البرمجي (File Path) | الوظيفة والدور في التطبيق (Role & Purpose) |
| :--- | :--- |
| `scripts/activityBookAllLessons.mjs` | سكربت أتمتة للمساعدة والتطوير الداخلي. |
| `scripts/activity_book_pages.json` | سكربت أتمتة للمساعدة والتطوير الداخلي. |
| `scripts/append_unit3_part2_activity.mjs` | سكربت دمج أجزاء المنهج للوحدة الثالثة. |
| `scripts/append_unit3_part2_chunks.mjs` | سكربت دمج أجزاء المنهج للوحدة الثالثة. |
| `scripts/append_unit3_part2_lessons.mjs` | سكربت دمج أجزاء المنهج للوحدة الثالثة. |
| `scripts/clean_and_scan.mjs` | سكربت تصليح ومعالجة نصوص ورموز قديمة أو تنظيف الترميز (UTF-8). |
| `scripts/connect_curriculum_registry.mjs` | سكربت أتمتة للمساعدة والتطوير الداخلي. |
| `scripts/export_app_data.mjs` | سكربت تصدير وضغط بيانات المنهج كملف نسخ احتياطي. |
| `scripts/extract_unit2_pdf.mjs` | سكربت استخراج وتحليل النصوص من ملفات PDF المنهجية. |
| `scripts/finalize_clean_utf8.mjs` | سكربت تصليح ومعالجة نصوص ورموز قديمة أو تنظيف الترميز (UTF-8). |
| `scripts/find_line_diff.mjs` | سكربت أتمتة للمساعدة والتطوير الداخلي. |
| `scripts/find_line_diff_fb.mjs` | سكربت أتمتة للمساعدة والتطوير الداخلي. |
| `scripts/fix_alerts.mjs` | سكربت تصليح ومعالجة نصوص ورموز قديمة أو تنظيف الترميز (UTF-8). |
| `scripts/fix_apostrophes.mjs` | سكربت تصليح ومعالجة نصوص ورموز قديمة أو تنظيف الترميز (UTF-8). |
| `scripts/fix_remaining.mjs` | سكربت تصليح ومعالجة نصوص ورموز قديمة أو تنظيف الترميز (UTF-8). |
| `scripts/fix_track13_audio.mjs` | سكربت أتمتة توليد المقاطع الصوتية للدروس باستخدام الذكاء الاصطناعي. |
| `scripts/generate-lesson1-audio.mjs` | سكربت أتمتة توليد المقاطع الصوتية للدروس باستخدام الذكاء الاصطناعي. |
| `scripts/generate-lesson1-elevenlabs.mjs` | سكربت أتمتة توليد المقاطع الصوتية للدروس باستخدام الذكاء الاصطناعي. |
| `scripts/generate-lesson2-audio.mjs` | سكربت أتمتة توليد المقاطع الصوتية للدروس باستخدام الذكاء الاصطناعي. |
| `scripts/generate-lesson3-elevenlabs.mjs` | سكربت أتمتة توليد المقاطع الصوتية للدروس باستخدام الذكاء الاصطناعي. |
| `scripts/generate-lesson4-elevenlabs.mjs` | سكربت أتمتة توليد المقاطع الصوتية للدروس باستخدام الذكاء الاصطناعي. |
| `scripts/generate-part1-boys.mjs` | سكربت أتمتة للمساعدة والتطوير الداخلي. |
| `scripts/generate-sara-audio.mjs` | سكربت أتمتة توليد المقاطع الصوتية للدروس باستخدام الذكاء الاصطناعي. |
| `scripts/generate_ahmed_story_elevenlabs.mjs` | سكربت أتمتة توليد المقاطع الصوتية للدروس باستخدام الذكاء الاصطناعي. |
| `scripts/generate_lesson10_american_youth.mjs` | سكربت أتمتة للمساعدة والتطوير الداخلي. |
| `scripts/generate_lesson10_young_boy.mjs` | سكربت أتمتة للمساعدة والتطوير الداخلي. |
| `scripts/generate_lesson5_audio.mjs` | سكربت أتمتة توليد المقاطع الصوتية للدروس باستخدام الذكاء الاصطناعي. |
| `scripts/generate_lessons5_6_elevenlabs.mjs` | سكربت أتمتة توليد المقاطع الصوتية للدروس باستخدام الذكاء الاصطناعي. |
| `scripts/generate_lessons7_9_elevenlabs.mjs` | سكربت أتمتة توليد المقاطع الصوتية للدروس باستخدام الذكاء الاصطناعي. |
| `scripts/generate_lessons8_10_elevenlabs.mjs` | سكربت أتمتة توليد المقاطع الصوتية للدروس باستخدام الذكاء الاصطناعي. |
| `scripts/generate_missing_audio.mjs` | سكربت أتمتة توليد المقاطع الصوتية للدروس باستخدام الذكاء الاصطناعي. |
| `scripts/generate_track18_rhyme.mjs` | سكربت أتمتة للمساعدة والتطوير الداخلي. |
| `scripts/generate_unit2_audio.mjs` | سكربت أتمتة توليد المقاطع الصوتية للدروس باستخدام الذكاء الاصطناعي. |
| `scripts/generate_unit3_audio.mjs` | سكربت أتمتة توليد المقاطع الصوتية للدروس باستخدام الذكاء الاصطناعي. |
| `scripts/grammarData.mjs` | سكربت أتمتة للمساعدة والتطوير الداخلي. |
| `scripts/inspect_unit2_data.mjs` | سكربت أتمتة للمساعدة والتطوير الداخلي. |
| `scripts/integrate_access_control.mjs` | سكربت ضبط ومزامنة قواعد التحكم والصلاحيات مع Firebase. |
| `scripts/link_unit2_audio.mjs` | سكربت أتمتة توليد المقاطع الصوتية للدروس باستخدام الذكاء الاصطناعي. |
| `scripts/link_unit3_audio.mjs` | سكربت أتمتة توليد المقاطع الصوتية للدروس باستخدام الذكاء الاصطناعي. |
| `scripts/pack_clean_zip.mjs` | سكربت تصليح ومعالجة نصوص ورموز قديمة أو تنظيف الترميز (UTF-8). |
| `scripts/regenerate_without_antoni.mjs` | سكربت أتمتة للمساعدة والتطوير الداخلي. |
| `scripts/restore_clean_utf8.mjs` | سكربت تصليح ومعالجة نصوص ورموز قديمة أو تنظيف الترميز (UTF-8). |
| `scripts/scan_mojibake.mjs` | سكربت أتمتة للمساعدة والتطوير الداخلي. |
| `scripts/slice_all_lessons_images.mjs` | سكربت قص ومعالجة صور صفحات الكتاب والأنشطة وتصديرها للأبعاد المناسبة. |
| `scripts/slice_unit3_grid.mjs` | سكربت قص ومعالجة صور صفحات الكتاب والأنشطة وتصديرها للأبعاد المناسبة. |
| `scripts/student_book_pages.json` | سكربت أتمتة للمساعدة والتطوير الداخلي. |
| `scripts/test_decode.mjs` | سكربت أتمتة للمساعدة والتطوير الداخلي. |
| `scripts/test_poem.mjs` | سكربت أتمتة للمساعدة والتطوير الداخلي. |
| `scripts/unit1Data.mjs` | سكربت أتمتة للمساعدة والتطوير الداخلي. |
| `scripts/update_app_for_unit3.mjs` | سكربت أتمتة للمساعدة والتطوير الداخلي. |
| `scripts/update_firebase_config.mjs` | سكربت ضبط ومزامنة قواعد التحكم والصلاحيات مع Firebase. |

---

## 17. ملفات متنوعة أخرى (1 ملفاً)

| المسار البرمجي (File Path) | الوظيفة والدور في التطبيق (Role & Purpose) |
| :--- | :--- |
| `src/components/curriculum/CurriculumDetailView.tsx` | ملف برمجي مساعد ضمن هيكل المنصة. |

---

