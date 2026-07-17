package com.schedulify.TimeTable_generator.export;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.schedulify.TimeTable_generator.entity.TimeTableEntry;
import com.schedulify.TimeTable_generator.enums.DayOfTheWeek;
import com.schedulify.TimeTable_generator.repo.TimeTableEntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PdfExportService {

    private final TimeTableEntryRepository timeTableEntryRepo;

    public byte[] export(Long runId) throws DocumentException {

        Document document = new Document();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        PdfWriter.getInstance(document, outputStream);

        document.open();

        document.add(new Paragraph(
                "Generated on : " + LocalDateTime.now().toString()
        ));

        List<TimeTableEntry> entries =
                timeTableEntryRepo.findByTimeTableRunId(runId);

        entries.sort(
                Comparator
                        .comparing(
                                (TimeTableEntry e) -> e.getTeachingAssignment().getClassGroup().getName()
                        )
                        .thenComparing(
                                e -> e.getTimeSlot().getDay()
                        )
                        .thenComparing(
                                e -> e.getTimeSlot().getStartTime()
                        )
        );

        Map<String , List<TimeTableEntry>> grouped =
                entries.stream()
                        .collect(
                                Collectors.groupingBy(
                                        entry ->
                                                entry.getTeachingAssignment().getClassGroup().getName()
                                )
                        );

        for(Map.Entry<String , List<TimeTableEntry>> group :
                                    grouped.entrySet())
        {
            String className = group.getKey();

            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD,18);

            Paragraph title = new Paragraph(
                    className + "TimeTable", titleFont);

            title.setAlignment(Paragraph.ALIGN_CENTER);

            document.add(title);

            document.add(new Paragraph(" "));

            Map<DayOfTheWeek , Map<LocalTime, String>> timeTableGrid = new HashMap<>();

            for(TimeTableEntry entry : group.getValue()){

                DayOfTheWeek day = entry.getTimeSlot().getDay();

                LocalTime startTime = entry.getTimeSlot().getStartTime();

                String lecture = entry.getTeachingAssignment().getSubject().getCode() + "\n" +
                        entry.getTeachingAssignment().getTeacher().getName() + "\nR-" +
                        entry.getRoom().getRoomNumber().toString();

                timeTableGrid.computeIfAbsent(day, k -> new HashMap<>())
                        .put(startTime, lecture);
            }

            Set<LocalTime> times = group.getValue()
                    .stream()
                    .map(entry -> entry.getTimeSlot().getStartTime())
                    .collect(Collectors.toSet());

            List<LocalTime> sortedTimes = times
                    .stream()
                    .sorted()
                    .toList();

            PdfPTable table = new PdfPTable(6);

            table.setWidthPercentage(100);

            table.setWidths(
                    new float[]{
                            1f,
                            2.5f,
                            2.5f,
                            2.5f,
                            2.5f,
                            2.5f
                    }
            );

            table.addCell(headerCell("Time"));
            table.addCell(headerCell("Monday"));
            table.addCell(headerCell("Tuesday"));
            table.addCell(headerCell("Wednesday"));
            table.addCell(headerCell("Thursday"));
            table.addCell(headerCell("Friday"));

            for(LocalTime time : sortedTimes) {

                table.addCell(time.toString());

                for(DayOfTheWeek day : DayOfTheWeek.values()) {

                    String lecture = timeTableGrid
                            .getOrDefault( day , new HashMap<>())
                            .getOrDefault( time, "-");

                    table.addCell(lecture);
                }

            }

            document.add(table);

        }

        document.close();

        return outputStream.toByteArray();
    }
    private PdfPCell headerCell(String text){
        PdfPCell cell = new PdfPCell(
                new Phrase((text))
        );

        cell.setBackgroundColor(BaseColor.LIGHT_GRAY);

        return cell;
    }
}
