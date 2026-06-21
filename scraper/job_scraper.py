import requests
import pandas as pd
import time
from datetime import datetime
import json

# Configuration
API_BASE_URL = "http://localhost:8000"
API_KEY = "your-api-key-1"  # Replace with your actual API key
OUTPUT_FILE = f"data_science_jobs_india_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"

# Search parameters
SEARCH_PARAMS = {
    "search_term": "data scientist OR data science OR machine learning OR AI engineer OR data analyst",
    "location": "India",
    "site_name": ["indeed", "linkedin", "naukri", "glassdoor"],  # Focus on India-relevant sites
    "results_wanted": 100,  # Maximum results per site
    "country_indeed": "India",
    "description_format": "markdown",
    # Note: job_type and is_remote are omitted to get all jobs (both types)
    "verbose": 1,
    "linkedin_fetch_description": False  # Set to True if you want full descriptions (slower)
}

# Additional search variations for comprehensive results
LOCATION_VARIATIONS = [
    "India",
    "Bangalore, India",
    "Mumbai, India",
    "Hyderabad, India",
    "Delhi, India",
    "Pune, India",
    "Chennai, India",
    "Kolkata, India",
    "Noida, India",
    "Gurgaon, India"
]

SEARCH_TERM_VARIATIONS = [
    "data scientist",
    "data science",
    "machine learning engineer",
    "AI engineer",
    "data analyst",
    "business analyst",
    "data engineer",
    "ML engineer",
    "deep learning engineer",
    "NLP engineer"
]


def make_api_request(params):
    """Make API request to JobSpy with error handling"""
    headers = {
        "x-api-key": API_KEY,
        "accept": "application/json"
    }
    
    # Remove empty string parameters to avoid validation errors
    params = {k: v for k, v in params.items() if v != "" and v is not None}
    
    try:
        response = requests.get(
            f"{API_BASE_URL}/api/v1/search_jobs",
            params=params,
            headers=headers,
            timeout=120
        )
        
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 429:
            print("⚠️  Rate limit hit. Waiting 60 seconds...")
            time.sleep(60)
            return make_api_request(params)
        else:
            print(f"❌ Error {response.status_code}: {response.text}")
            return None
            
    except requests.exceptions.Timeout:
        print("⚠️  Request timed out. Retrying...")
        time.sleep(10)
        return make_api_request(params)
    except Exception as e:
        print(f"❌ Exception occurred: {str(e)}")
        return None


def scrape_all_jobs():
    """Scrape jobs with multiple search variations"""
    all_jobs = []
    total_requests = 0
    
    print("🚀 Starting comprehensive job scraping for Data Science roles in India...")
    print(f"📊 Will search {len(SEARCH_TERM_VARIATIONS)} job titles across {len(LOCATION_VARIATIONS)} locations")
    print("=" * 80)
    
    for search_term in SEARCH_TERM_VARIATIONS:
        for location in LOCATION_VARIATIONS:
            params = SEARCH_PARAMS.copy()
            params["search_term"] = search_term
            params["location"] = location
            
            print(f"\n🔍 Searching: '{search_term}' in '{location}'")
            
            result = make_api_request(params)
            
            if result and "jobs" in result:
                jobs_count = len(result["jobs"])
                all_jobs.extend(result["jobs"])
                total_requests += 1
                
                print(f"✅ Found {jobs_count} jobs (Total so far: {len(all_jobs)})")
                
                # Add small delay to avoid overwhelming the API
                time.sleep(2)
            else:
                print(f"❌ No results for this search")
            
            # Progress indicator
            print("-" * 80)
    
    return all_jobs, total_requests


def clean_and_deduplicate(jobs_list):
    """Remove duplicate jobs and clean data"""
    print("\n🧹 Cleaning and deduplicating data...")
    
    # Convert to DataFrame
    df = pd.DataFrame(jobs_list)
    
    initial_count = len(df)
    print(f"📊 Initial job count: {initial_count}")
    
    # Remove duplicates based on job URL (most reliable unique identifier)
    if 'job_url' in df.columns:
        df = df.drop_duplicates(subset=['job_url'], keep='first')
        print(f"🔄 After removing duplicate URLs: {len(df)} jobs")
    
    # Alternative: remove duplicates based on title + company + location
    if 'title' in df.columns and 'company' in df.columns:
        df = df.drop_duplicates(subset=['title', 'company', 'location'], keep='first')
        print(f"🔄 After removing duplicate title+company+location: {len(df)} jobs")
    
    duplicates_removed = initial_count - len(df)
    print(f"✅ Removed {duplicates_removed} duplicates ({(duplicates_removed/initial_count*100):.1f}%)")
    
    return df


def save_results(df, filename):
    """Save results to CSV and JSON"""
    print(f"\n💾 Saving results...")
    
    # Save as CSV
    df.to_csv(filename, index=False, encoding='utf-8')
    print(f"✅ Saved CSV: {filename}")
    
    # Save as JSON for backup
    json_filename = filename.replace('.csv', '.json')
    df.to_json(json_filename, orient='records', indent=2)
    print(f"✅ Saved JSON: {json_filename}")
    
    # Print summary statistics
    print("\n" + "=" * 80)
    print("📈 SUMMARY STATISTICS")
    print("=" * 80)
    print(f"Total unique jobs scraped: {len(df)}")
    
    if 'site' in df.columns:
        print(f"\nJobs by site:")
        print(df['site'].value_counts().to_string())
    
    if 'job_type' in df.columns:
        print(f"\nJobs by type:")
        print(df['job_type'].value_counts().to_string())
    
    if 'company' in df.columns:
        print(f"\nTop 10 companies:")
        print(df['company'].value_counts().head(10).to_string())
    
    if 'location' in df.columns:
        print(f"\nTop 10 locations:")
        # Extract city from location string
        df['city'] = df['location'].str.split(',').str[0]
        print(df['city'].value_counts().head(10).to_string())


def main():
    """Main execution function"""
    start_time = time.time()
    
    # Step 1: Scrape jobs
    all_jobs, total_requests = scrape_all_jobs()
    
    if not all_jobs:
        print("\n❌ No jobs found. Please check your API configuration.")
        return
    
    # Step 2: Clean and deduplicate
    df = clean_and_deduplicate(all_jobs)
    
    # Step 3: Save results
    save_results(df, OUTPUT_FILE)
    
    # Final summary
    elapsed_time = time.time() - start_time
    print(f"\n⏱️  Total execution time: {elapsed_time/60:.2f} minutes")
    print(f"📊 API requests made: {total_requests}")
    print(f"📁 Output file: {OUTPUT_FILE}")
    print("\n✨ Scraping completed successfully!")


if __name__ == "__main__":
    main()