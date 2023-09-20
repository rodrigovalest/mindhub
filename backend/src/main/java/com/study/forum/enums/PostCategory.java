package com.study.forum.enums;

public enum PostCategory {
    MATHEMATICS("Mathematics"),
    SCIENCES("Sciences"),
    LANGUAGES("Languages"),
    HISTORY("History"),
    GEOGRAPHY("Geography"),
    LITERATURE("Literature"),
    PERSONAL_DEVELOPMENT("Personal Development"),
    TECHNOLOGY_AND_PROGRAMMING("Technology and Programming"),
    ARTS_AND_CREATIVITY("Arts and Creativity"),
    HEALTH_AND_WELLNESS("Health and Wellness"),
    BUSINESS_AND_ENTREPRENEURSHIP("Business and Entrepreneurship"),
    ADVANCED_SCIENCE_AND_TECHNOLOGY("Advanced Science and Technology"),
    INTERDISCIPLINARY_STUDIES("Interdisciplinary Studies"),
    LANGUAGES_AND_CULTURES("Languages and Cultures"),
    EXAM_PREPARATION("Exam Preparation"),
    RECOMMENDED_READINGS("Recommended Readings");

    private final String displayCategory;

    PostCategory(String displayCategory) {
        this.displayCategory = displayCategory;
    }

    public String getDisplayCategory() {
        return displayCategory;
    }
}
