package com.schedulify.TimeTable_generator.dto;


//public class TeachingAssDTO {
//    private Long teacherId;
//    private Long subjectId;
//    private Long classGroupId;
//    private Integer frequency;
//}

public record TeachingAssDTO(

        Long teacherId,
        Long subjectId ,
        Long classGroupId ,
        Integer frequency
) {}
