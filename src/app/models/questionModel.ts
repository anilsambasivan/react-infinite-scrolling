export interface QuestionModel {
    is_answered: string,
    view_count: string,
    answer_count: string,
    score: string,
    last_activity_date: string,
    creation_date: string,
    last_edit_date: string,
    question_id: number,
    content_license: string,
    link: string,
    title: string,
    owner: OwnerModel
}

export interface OwnerModel {
    reputation: string,
    user_id: string,
    user_type: string,
    profile_image: string,
    display_name: string,
    link: string
}

export interface QuestionResponseModel {
    has_more: string
    quota_max: string
    quota_remaining: string
    items: QuestionModel[]
}
