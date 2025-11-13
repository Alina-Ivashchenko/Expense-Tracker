USE expense_tracker;

CREATE INDEX idx_categories_user ON categories(user_id);
CREATE INDEX idx_expenses_user_date ON expenses(user_id, txn_date);
CREATE INDEX idx_expenses_user_category ON expenses(user_id, category_id);
CREATE INDEX idx_expenses_user_type ON expenses(user_id, txn_type);
