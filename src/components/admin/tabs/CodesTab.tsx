import React, { useState } from 'react';
import { KeyRound, RefreshCw, Check, Copy, UserX, Lock, Sparkles, Trash2 } from 'lucide-react';
import {
  PlatformConfig,
  updatePlatformConfig,
  generateRandomAccessCode,
  generateSingleUseCode,
  deleteSingleUseCode,
  updateTeacherPin,
} from '../../../services/firebase';

interface CodesTabProps {
  platformConfig: PlatformConfig;
}

export const CodesTab: React.FC<CodesTabProps> = ({ platformConfig }) => {
  const [newMasterCode, setNewMasterCode] = useState(platformConfig.masterCode || 'IQ-7788');
  const [newTeacherPin, setNewTeacherPin] = useState('');
  const [settingsSaveMsg, setSettingsSaveMsg] = useState<string | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);
  const [isGeneratingSingleCode, setIsGeneratingSingleCode] = useState(false);
  const [copiedSingleCode, setCopiedSingleCode] = useState<string | null>(null);

  const handleGenerateNewCode = () => {
    const code = generateRandomAccessCode();
    setNewMasterCode(code);
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopySingleCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedSingleCode(code);
      setTimeout(() => setCopiedSingleCode(null), 2000);
    } catch {
      // fallback
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSaveMsg('جاري حفظ التغييرات...');
    try {
      const updates: Partial<PlatformConfig> = {};
      if (newMasterCode.trim()) {
        updates.masterCode = newMasterCode.trim().toUpperCase();
      }
      if (newTeacherPin.trim()) {
        await updateTeacherPin(newTeacherPin.trim());
      }
      if (Object.keys(updates).length > 0) {
        await updatePlatformConfig(updates);
      }
      setSettingsSaveMsg('تم حفظ الإعدادات بنجاح!');
      setNewTeacherPin('');
      setTimeout(() => setSettingsSaveMsg(null), 3000);
    } catch {
      setSettingsSaveMsg('حدث خطأ أثناء حفظ الإعدادات.');
      setTimeout(() => setSettingsSaveMsg(null), 3000);
    }
  };

  const handleCreateSingleCode = async () => {
    setIsGeneratingSingleCode(true);
    try {
      await generateSingleUseCode();
    } catch {
      // error handled
    } finally {
      setIsGeneratingSingleCode(false);
    }
  };

  const handleDeleteSingleCode = async (code: string) => {
    try {
      await deleteSingleUseCode(code);
    } catch {
      // error handled
    }
  };

  return (
    <div className="space-y-5 text-right">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 max-w-xl mx-auto space-y-5">
        <div>
          <h3 className="text-base font-bold text-slate-800 font-arabic">
            إعدادات كود التفعيل والرمز السري للأستاذ
          </h3>
          <p className="text-xs text-slate-500 font-arabic mt-0.5">
            يمكنك تغيير كود تفعيل الطلاب أو الرمز السري الخاص بك في أي وقت:
          </p>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 font-arabic flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-slate-600" />
              <span>كود تفعيل الطلاب الرئيسي:</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newMasterCode}
                onChange={(e) => setNewMasterCode(e.target.value)}
                placeholder="IQ-XXXX"
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-slate-800 focus:border-slate-800 focus:ring-0 uppercase tracking-wider"
              />
              <button
                type="button"
                onClick={handleGenerateNewCode}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer font-arabic transition-colors shrink-0 shadow-2xs"
                title="توليد كود تفعيل عشوائي جديد بضغطة زر"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>توليد كود جديد</span>
              </button>
              <button
                type="button"
                onClick={() => handleCopyCode(newMasterCode)}
                className="px-3 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1 cursor-pointer font-arabic transition-colors shrink-0"
                title="نسخ الكود لمشاركته مع الطلاب"
              >
                {codeCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-arabic">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="font-arabic">نسخ</span>
                  </>
                )}
              </button>
            </div>
            <span className="text-[11px] text-slate-400 font-arabic block">
              هذا هو الكود الفعّال الذي ترسله لطلابك ليسجلوا به في المنصة.
            </span>

            {/* Display revoked codes if any */}
            {platformConfig.revokedCodes && platformConfig.revokedCodes.length > 0 && (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-arabic space-y-1.5 mt-2">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-bold flex items-center gap-1">
                    <UserX className="w-3.5 h-3.5 text-rose-500" />
                    الأكواد الملغاة والمحظورة ({platformConfig.revokedCodes.length} كود):
                  </span>
                  <span className="text-[10px] text-slate-400">لا يمكن الدخول بهذه الأكواد</span>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {platformConfig.revokedCodes.map((rc, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md font-mono text-[11px] bg-rose-50 text-rose-700 border border-rose-200 line-through"
                    >
                      {rc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 font-arabic flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-600" />
              <span>الرمز السري للأستاذ (PIN):</span>
            </label>
            <input
              type="password"
              value={newTeacherPin}
              onChange={(e) => setNewTeacherPin(e.target.value)}
              placeholder="أدخل رمزاً جديداً لتغييره..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 font-mono font-bold text-slate-800 focus:border-slate-800 focus:ring-0"
            />
            <span className="text-[11px] text-slate-400 font-arabic block">
              الرمز الذي يفتح لك لوحة التحكم هذه ويمنحك صلاحية الأستاذ.
            </span>
          </div>

          {settingsSaveMsg && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-arabic">
              {settingsSaveMsg}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors font-arabic"
          >
            حفظ التغييرات
          </button>
        </form>
      </div>

      {/* Single-Use Codes Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 max-w-xl mx-auto space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-800 font-arabic flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-slate-700" />
              <span>أكواد التفعيل الفردية (لطالب واحد ولمرة واحدة)</span>
            </h3>
            <p className="text-xs text-slate-500 font-arabic mt-1 leading-relaxed">
              توليد كود خاص يُقفل تلقائياً على أول طالب يسجل به؛ لا يمكن لأي طالب آخر استخدامه إطلاقاً.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreateSingleCode}
            disabled={isGeneratingSingleCode}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer font-arabic transition-colors shrink-0 shadow-2xs disabled:opacity-50"
            title="توليد كود تفعيل فردي جديد"
          >
            {isGeneratingSingleCode ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>جاري التوليد...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>توليد كود فردي جديد</span>
              </>
            )}
          </button>
        </div>

        {/* Codes List */}
        <div className="space-y-2.5">
          {!platformConfig.singleUseCodes || platformConfig.singleUseCodes.length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 font-arabic">
              لم يتم توليد أي كود فردي بعد. اضغط على زر &quot;توليد كود فردي جديد&quot; بالأعلى لإنشاء كود خاص لأحد الطلاب.
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {platformConfig.singleUseCodes.map((item, idx) => (
                <div
                  key={item.code || idx}
                  className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 text-right"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-sm tracking-wider text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        {item.code}
                      </span>
                      {item.isUsed ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-300 font-arabic">
                          مُستخدم
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-arabic">
                          متاح للتسجيل
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-500 font-arabic">
                      {item.isUsed ? (
                        <span>
                          مسجل باسم: <strong className="text-slate-800">{item.usedByStudentName || 'طالب'}</strong>
                          {item.usedBySection ? ` (شعبة ${item.usedBySection})` : ''}
                        </span>
                      ) : (
                        <span>جاهز لإرساله إلى طالب واحد</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopySingleCode(item.code)}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold font-arabic flex items-center gap-1 cursor-pointer transition-colors"
                      title="نسخ الكود"
                    >
                      {copiedSingleCode === item.code ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 text-[11px]">تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[11px]">نسخ</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteSingleCode(item.code)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="حذف الكود"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
