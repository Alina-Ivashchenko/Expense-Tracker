USE expense_tracker;

INSERT INTO users (email, password_hash, display_name)
VALUES
  ('alex@example.com', '$2b$12$replace_with_bcrypt', 'Alex'),
  ('sara@example.com', '$2b$12$replace_with_bcrypt', 'Sara');

INSERT INTO categories (user_id, name, color_hex, icon_key) VALUES
  (1, 'Groceries', '#16A34A', 'shopping-cart'),
  (1, 'Rent', '#DC2626', 'home'),
  (1, 'Salary', '#2563EB', 'briefcase'),
  (2, 'Eating_out', '#F59E0B', 'utensils');

INSERT INTO expenses (user_id, category_id, txn_type, amount_cents, currency_code, txn_date, merchant, note) VALUES
  (1, (SELECT id FROM categories WHERE user_id=1 AND name='Groceries'), 'expense', 4599, 'USD', '2025-10-29', 'Target', 'Weekly groceries'),
  (1, (SELECT id FROM categories WHERE user_id=1 AND name='Salary'),   'income',  250000, 'USD', '2025-10-31', 'Employer Inc', 'Paycheck'),
  (2, (SELECT id FROM categories WHERE user_id=2 AND name='Eating_out'),'expense', 1899, 'USD', '2025-10-28', 'Chipotle', 'Lunch');
