# brailleLearning

meeting questions: 
1. can you read the space typed in the braille?
2. late work, allow submissions past due date?
  - if not, what happens if you do not complete a prereq  
3. do we need to have a published flag on assignments? the alternative is to just put them in the future
  - should start and end dates be required?
4. how paranoid are we about archiving? if we reset for a semester do we need to keep old submissions?

## notes

- [x] number the letter indicators (f 1, d 2, s 3, j 4, k 5, l 6)
- [x] dont include a and ;
- [ ] assignments
  - [x] option to show a reference
  <!-- - [ ] option to hide text live feed (always hidden for now) -->
  - [x] braille to print assignmets
  - [x] print to braille assignments
- [ ] admin / teacher
  - [x] grade assignments ( opportunity for teacher to override )
  - [ ] auto grade with multiple correct answers
  - [x] just the due datetime
  - [x] track time to complete
  - [ ] assignment prerequisites
  - [x] assignment open date


- [x] assignment total points
- [x] null grade if not graded yet
- [ ] show assignment as complete on homepage if there are submissions as a student

- [ ] duplicate spaces in braille to make them more obvious
- [ ] show assignments that will be available once prerequs met "Course Assignments"
- [ ] get new account experience to throw no errors
  - [ ] add a home page that explains wtf this is

grading:
- [ ] grading submission - assignment takes the whole screen, prevous and next buttons
- [ ] only grade the most recent submission

multi-stage assignments:
- [ ] braille a word "character", show an new word
- [ ] show all the words, retry them before submitting
- [ ] probably not mixing and matching braille to print and print to braille

## style requirements

- [ ] everything mildly rounded
  - [ ] date label
  - [ ] student assignment list
  - [ ] admin navigation

- [ ] light mode color scheme
- [ ] datetime labels need to all be the same size and indentation
- [ ] light mode datepicker
- [ ] focus input borders based on color scheme
- [ ] reference braille on student assignment view looks bad
- [ ] text to type on assignment detail needs to be bigger
- [ ] style braille number keys to be bolder rather than the letters (numbers first, letters second)


Hear

H - ea - ar


wea - the - r
not: wea - th - er
- because `the` is strong and `th` and `er` are lower
- strong contraction > strong groupsign > everything else
- wordsign gets precedence if it is the entire word
- some shortform words can be used as parts of words
  - can be followed by "'s"
- grade 1 is just letters, grade 2 is where non alphabetic characters happen
``
https://iceb.org/Rules%20of%20Unified%20English%20Braille%202013.pdf


nov 27th: features done

dec 11th: ship the code

sem start jan: 8