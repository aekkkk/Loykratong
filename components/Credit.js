// เครดิตผู้จัดทำและสัญญาอนุญาต
export default function Credit({ className = '' }) {
  return (
    <p className={`credit ${className}`}>
      จัดทำโดย มัธยมศึกษาปีที่ 2 ห้อง 7 · เผยแพร่ภายใต้สัญญาอนุญาต{' '}
      <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.th" target="_blank" rel="license noopener noreferrer">CC BY-NC-SA 4.0</a>
    </p>
  );
}
