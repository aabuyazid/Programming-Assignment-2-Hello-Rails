class AddUniqueIndexToTitle < ActiveRecord::Migration[7.2]
  def change
    add_index :movies, :title, unique: true
  end
end
