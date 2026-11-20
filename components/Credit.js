// เครดิตผู้จัดทำและสัญญาอนุญาต
export default function Credit({ className = '' }) {
  return (
    <p className={className}>
      จัดทำโดย มัธยมศึกษาปีที่ 2 ห้อง 7 · เผยแพร่ภายใต้สัญญาอนุญาต{' '}
      <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.th" target="_blank" rel="license noopener noreferrer" className="underline decoration-current/30 underline-offset-[3px] hover:decoration-current">CC BY-NC-SA 4.0</a>
    </p>
  );
}
