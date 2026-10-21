import React from 'react';
import { StudentSession } from '../../services/firebase';

interface AppFooterProps {
  isTeacherLoggedIn: boolean;
  studentSession: StudentSession | null;
  onOpenTeacherDashboard: () => void;
  onLogoutTeacher: () => void;
  onLogoutStudent: () => void;
}

export const AppFooter: React.FC<AppFooterProps> = ({
  isTeacherLoggedIn,
  studentSession,
  onOpenTeacherDashboard,
  onLogoutTeacher,
  onLogoutStudent,
}) => {
  return (
    <footer className="border-t border-zinc-200 bg-white py-5 mt-10" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center text-xs text-zinc-500 font-arabic">
        <span>English for Iraq • الصف الأول المتوسط • إعداد وإشراف مدرس المادة</span>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {isTeacherLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="text-zinc-800 bg-zinc-100 px-2.5 py-1 rounded-lg font-bold">
                أنت في وضع: أستاذ المادة
              </span>
              <button
                onClick={onOpenTeacherDashboard}
                className="text-zinc-900 hover:underline font-bold cursor-pointer"
              >
                لوحة تحكم الأستاذ
              </button>
              <button
                onClick={onLogoutTeacher}
                className="text-zinc-500 hover:text-zinc-900 underline cursor-pointer"
              >
                خروج
              </button>
            </div>
          ) : studentSession ? (
            <div className="flex items-center gap-2">
              <span className="text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                الطالب: <strong>{studentSession.fullName}</strong> (شعبة {studentSession.section})
              </span>
              <button
                onClick={onLogoutStudent}
                className="text-slate-500 hover:text-slate-800 underline cursor-pointer text-[11px]"
                title="تسجيل خروج الطالب والعودة لشاشة البداية"
              >
                خروج الطالب
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
};
