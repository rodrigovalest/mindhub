interface IPostCategoriesSelect {
  className?: string | undefined,
  state?: string,
  setState?: React.Dispatch<React.SetStateAction<string>>,
}

enum PostCategory {
  MATHEMATICS = 'Mathematics',
  SCIENCES = 'Sciences',
  LANGUAGES = 'Languages',
  HISTORY = 'History',
  GEOGRAPHY = 'Geography',
  LITERATURE = 'Literature',
  PERSONAL_DEVELOPMENT = 'Personal Development',
  TECHNOLOGY_AND_PROGRAMMING = 'Technology and Programming',
  ARTS_AND_CREATIVITY = 'Arts and Creativity',
  HEALTH_AND_WELLNESS = 'Health and Wellness',
  BUSINESS_AND_ENTREPRENEURSHIP = 'Business and Entrepreneurship',
  ADVANCED_SCIENCE_AND_TECHNOLOGY = 'Advanced Science and Technology',
  INTERDISCIPLINARY_STUDIES = 'Interdisciplinary Studies',
  LANGUAGES_AND_CULTURES = 'Languages and Cultures',
  EXAM_PREPARATION = 'Exam Preparation',
  RECOMMENDED_READINGS = 'Recommended Readings',
}

const transformToEnumFormat = (str: string) => {
  return str.toUpperCase().replace(/\s+/g, '_');
};


const PostCategoriesSelect = ({ className, state, setState }: IPostCategoriesSelect) => {
  const categories = Object.values(PostCategory);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = transformToEnumFormat(event.target.value);
    setState && setState(selectedCategory);
  };

  return (
    <select 
      className={`${className} rounded-md w-full`}
      value={state}
      onChange={handleCategoryChange}
    >
      <option disabled defaultChecked>Select a category</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}

export default PostCategoriesSelect;
