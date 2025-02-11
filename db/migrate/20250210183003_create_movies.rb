class CreateMovies < ActiveRecord::Migration[7.2]
  def change
    create_table :movies do |t|
      t.string :title, uniqu
      t.string :rating
      t.text :description
      t.datetime :release_date
      t.timestamp

      t.index :title, unique: true
    end
  end
end
