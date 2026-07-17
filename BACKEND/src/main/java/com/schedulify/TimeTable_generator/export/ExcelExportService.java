package com.schedulify.TimeTable_generator.export;

import com.schedulify.TimeTable_generator.entity.TimeTableEntry;
import com.schedulify.TimeTable_generator.repo.TimeTableEntryRepository;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExcelExportService {

    private final TimeTableEntryRepository timeTableEntryRepo;

    public byte[] export(Long runId) throws IOException {

        List<TimeTableEntry> entries =
                timeTableEntryRepo.findByTimeTableRunId(runId);

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("TimeTable");

        Row header = sheet.createRow(0);

        header.createCell(0).setCellValue("Subject");
        header.createCell(1).setCellValue("Teacher");
        header.createCell(2).setCellValue("Class");
        header.createCell(3).setCellValue("Room");
        header.createCell(4).setCellValue("Day");
        header.createCell(5).setCellValue("start");
        header.createCell(6).setCellValue("end");

        int RowNum = 1;

        for(TimeTableEntry entry : entries){

            Row row = sheet.createRow(RowNum++);

            row.createCell(0)
                    .setCellValue(
                            entry.getTeachingAssignment()
                                    .getSubject()
                                    .getName()
                    );

            row.createCell(1)
                    .setCellValue(
                            entry.getTeachingAssignment()
                                    .getTeacher()
                                    .getName()
                    );

            row.createCell(2)
                    .setCellValue(
                            entry.getTeachingAssignment()
                                    .getClassGroup()
                                    .getName()
                    );

            row.createCell(3)
                    .setCellValue(
                            entry.getRoom()
                                    .getRoomNumber()
                    );

            row.createCell(4)
                    .setCellValue(
                            entry.getTimeSlot()
                                    .getDay()
                                    .toString()
                    );

            row.createCell(5)
                    .setCellValue(
                            entry.getTimeSlot()
                                    .getStartTime()
                            .toString()
                    );

            row.createCell(6)
                    .setCellValue(
                            entry.getTimeSlot()
                                    .getEndTime()
                                    .toString()
                    );

        }

        for(int i = 0 ; i < 7 ;i++) sheet.autoSizeColumn(i);

        ByteArrayOutputStream out =
                new ByteArrayOutputStream();

        workbook.write(out);

        return out.toByteArray();

    }
}
