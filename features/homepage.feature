Feature: LiveTraffic-HomePage
    In order to validate live traffic homepage features
    As a user
    I want to launch and land on homepage

    @bvt @smoke
    Scenario: verify home page
        Given I go to "https://www.protractortest.org/"
        When user validate the homepage title as "Protractor - end-to-end testing for AngularJS"
